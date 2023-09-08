import typing

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets

from expiration_tracker.mixins import ChoiceMixin, ListSerializerMixin
from items.constants import ItemCategory
from items.models import Item, Location
from items.serializers import BaseItemSerializer, BaseLocationSerializer, ItemSerializer, LocationSerializer


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


class LocationViewSet(
    ListSerializerMixin,
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
