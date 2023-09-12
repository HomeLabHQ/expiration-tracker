import typing

from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from duckduckgo_search import DDGS
from expiration_tracker.mixins import ChoiceMixin, ListSerializerMixin
from expiration_tracker.throttles import SearchThrottle
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

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


class ItemViewSet(
    ListSerializerMixin,
    ChoiceMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    create:
    Create Item

    As authenticated user you can create order by providing product and quantity

    list:
    All items.


    retrieve:
    Details for single item


    update:
    Update Item



    partial_update:
    Update Item


    """

    all_choices: typing.ClassVar = {"category": ItemCategory}
    serializer_class = ItemSerializer
    list_serializer_class = BaseItemSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = Item.objects.all()

    @action(
        detail=False,
        methods=["POST"],
        serializer_class=ItemSearchSerializer,
        url_path="search",
        url_name="search",
        throttle_classes=(SearchThrottle,),
    )
    def search(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = []
        with DDGS() as ddgs:
            result.extend(
                iter(
                    ddgs.text(
                        serializer.validated_data["barcode"],
                        region=settings.SEARCH_REGION,
                        backend="lite",
                    ),
                ),
            )
        #! Remove ru links from search result
        result = [SearchResultSerializer(d).data for d in result if "ru" not in d.get("href", None)]
        return Response(data=result)


class LocationViewSet(
    ListSerializerMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    list:
    All items.

    retrieve:
    Details for single item

    """

    serializer_class = LocationSerializer
    list_serializer_class = BaseLocationSerializer
    filter_backends = (DjangoFilterBackend,)
    queryset = Location.objects.all()
