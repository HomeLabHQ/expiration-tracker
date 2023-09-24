from django_filters import rest_framework as filters

from items.models import Item


class ItemFilter(filters.FilterSet):
    upc = filters.CharFilter(field_name="upc", lookup_expr="iexact")

    class Meta:
        model = Item
        fields = ("upc",)
