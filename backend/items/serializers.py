from rest_framework import serializers

from expiration_tracker.mixins import RepresentationPKField
from items.models import Item, Location


class BaseLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "title")


class LocationSerializer(BaseLocationSerializer):
    # TODO: Add list of all items in this location?
    class Meta(BaseLocationSerializer.Meta):
        fields = (*BaseLocationSerializer.Meta.fields, "description")


class BaseItemSerializer(serializers.ModelSerializer):
    location = RepresentationPKField(
        many=False,
        representation=BaseLocationSerializer,
        queryset=Location.objects.all(),
        required=True,
    )

    class Meta:
        model = Item
        fields = ("id", "title", "category", "quantity", "expiration_date", "location", "ttl")


class ItemSerializer(BaseItemSerializer):
    class Meta(BaseItemSerializer.Meta):
        fields = (*BaseItemSerializer.Meta.fields, "created_at")
