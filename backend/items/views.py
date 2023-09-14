import typing

from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from duckduckgo_search import DDGS
from httpx import HTTPStatusError
from expiration_tracker.mixins import ChoiceMixin, ListSerializerMixin
from expiration_tracker.throttles import SearchThrottle
from rest_framework import mixins, viewsets, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from items.constants import ItemCategory
from items.models import Item, Location
from items.serializers import (
    BaseItemSerializer,
    BaseLocationSerializer,
    ItemSearchSerializer,
    ItemSerializer,
    LocationSerializer,
    SearchResultSerializer,
)


@extend_schema_view(create=extend_schema(responses=OpenApiResponse(response=ItemSerializer)))
class ItemViewSet(
    ListSerializerMixin,
    ChoiceMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    all_choices: typing.ClassVar = {"category": ItemCategory}
    serializer_class = ItemSerializer
    list_serializer_class = BaseItemSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = Item.objects.all()

    @extend_schema(
        summary="Perform search",
        request=ItemSearchSerializer,
        description="Send search string to duck duck go",
        responses={
            201: OpenApiResponse(
                response=serializers.ListSerializer(child=SearchResultSerializer()),
                description="Created. New resource in response",
            ),
            400: OpenApiResponse(description="Bad request (something invalid)"),
        },
    )
    @action(
        detail=False,
        methods=["POST"],
        serializer_class=ItemSearchSerializer,
        url_path="search",
        url_name="search",
        throttle_classes=(SearchThrottle,),
        pagination_class=None,
    )
    def search(self, request, *args, **kwargs):
        self.pagination_class = None
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = []
        with DDGS() as ddgs:
            try:
                result.extend(
                    iter(
                        ddgs.text(
                            serializer.validated_data["barcode"],
                            region=settings.SEARCH_REGION,
                            backend="lite",
                        ),
                    ),
                )
            except HTTPStatusError:
                return Response(status=400)
        return Response(data=result)


class LocationViewSet(
    ListSerializerMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    create:
    Create Location

    list:
    All Locations

    retrieve:
    Details for single location

    """

    serializer_class = LocationSerializer
    list_serializer_class = BaseLocationSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = Location.objects.all()
