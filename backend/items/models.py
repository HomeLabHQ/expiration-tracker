import datetime
import typing

from django.db import models
from expiration_tracker.models import TimeStampedModel, TitleDescriptionModel, TitleModel

from items.constants import ItemCategory, ItemStatus


class Location(TitleDescriptionModel):
    class Meta:
        db_table = "locations"
        verbose_name_plural = "locations"
        ordering = ("-id",)

    def __str__(self):
        return f"{self.title}"


class Item(TimeStampedModel, TitleModel):
    category = models.CharField(
        max_length=255,
        choices=[(v.name, v.value) for v in ItemCategory],
        default=ItemCategory.GOODS.name,
    )
    status = models.CharField(
        max_length=255,
        choices=[(v.name, v.value) for v in ItemStatus],
        default=ItemStatus.STOCK.name,
    )
    opening_date = models.DateField(null=True)
    expiration_date = models.DateField(null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    upc = models.CharField(max_length=20, blank=True, null=True)

    @property
    def ttl(self):
        return (self.expiration_date - datetime.date.today()).days

    class Meta:
        db_table = "items"
        verbose_name_plural = "items"
        ordering = ("-id",)
        indexes: typing.ClassVar = [
            models.Index(fields=["upc"]),
            models.Index(fields=["location"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return f"{self.title}"
