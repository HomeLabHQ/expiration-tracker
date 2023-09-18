from expiration_tracker.mixins import RepresentationPKField
from rest_framework import serializers

from items.constants import ItemCategory
from items.models import Item, Location


class BaseLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "title")


class LocationSerializer(BaseLocationSerializer):
    class Meta(BaseLocationSerializer.Meta):
        fields = (*BaseLocationSerializer.Meta.fields, "description")


class BaseItemSerializer(serializers.ModelSerializer):
    location = RepresentationPKField(
        many=False,
        representation=BaseLocationSerializer,
        queryset=Location.objects.all(),
        required=True,
    )
    ttl = serializers.IntegerField(required=False, read_only=True)

    class Meta:
        model = Item
        fields = ("id", "title", "category", "quantity", "expiration_date", "location", "ttl")
        read_only_fields = ("ttl",)


class ReprBaseItemSerializer(BaseItemSerializer):
    location = BaseLocationSerializer()
    quantity = serializers.IntegerField(required=True)
    category = serializers.ChoiceField(choices=[(v.name, v.value) for v in ItemCategory], required=True)


class ItemSerializer(BaseItemSerializer):
    class Meta(BaseItemSerializer.Meta):
        fields = (*BaseItemSerializer.Meta.fields, "created_at")


class ReprItemSerializer(ItemSerializer):
    location = BaseLocationSerializer()
    quantity = serializers.IntegerField(required=True)
    category = serializers.ChoiceField(choices=[(v.name, v.value) for v in ItemCategory], required=True)


class ItemSearchSerializer(serializers.Serializer):
    barcode = serializers.CharField(max_length=50)


class SearchResultSerializer(serializers.Serializer):
    title = serializers.CharField()
    href = serializers.CharField()
    body = serializers.CharField()
