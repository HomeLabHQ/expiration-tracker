from django.contrib import admin

from .models import Item, Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("id", "description", "title")


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
        "updated_at",
        "title",
        "category",
        "status",
        "expiration_date",
        "location",
    )
    list_filter = ("created_at", "updated_at", "expiration_date", "location")
    date_hierarchy = "created_at"
