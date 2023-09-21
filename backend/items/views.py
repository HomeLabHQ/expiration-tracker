import datetime
import typing

from django.conf import settings
from django.db.models import F
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from duckduckgo_search import DDGS
from expiration_tracker.mixins import ChoiceMixin, ListSerializerMixin
from expiration_tracker.throttles import SearchThrottle
from httpx import HTTPStatusError
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from items.constants import ItemCategory, ItemStatus
from items.models import Item, Location
from items.serializers import (
    BaseItemSerializer,
    BaseLocationSerializer,
    ItemSearchSerializer,
    ItemSerializer,
    LocationSerializer,
    ReprBaseItemSerializer,
    ReprItemSerializer,
    SearchResultSerializer,
)


@extend_schema(tags=["items"])
@extend_schema_view(
    retrieve=extend_schema(responses=OpenApiResponse(ReprItemSerializer)),
    list=extend_schema(responses=OpenApiResponse(ReprBaseItemSerializer)),
    create=extend_schema(responses=OpenApiResponse(ReprItemSerializer)),
    update=extend_schema(responses=OpenApiResponse(ReprItemSerializer)),
    partial_update=extend_schema(responses=OpenApiResponse(ReprItemSerializer)),
)
class ItemViewSet(
    ListSerializerMixin,
    ChoiceMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    all_choices: typing.ClassVar = {"category": ItemCategory, "status": ItemStatus}
    serializer_class = ItemSerializer
    list_serializer_class = BaseItemSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = (
        Item.objects.annotate(expiration=(F("expiration_date") - datetime.date.today())).all().order_by("expiration")
    )

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


@extend_schema(tags=["locations"])
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
