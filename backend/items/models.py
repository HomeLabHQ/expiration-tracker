import datetime

from django.db import models
from expiration_tracker.models import TimeStampedModel, TitleDescriptionModel, TitleModel

from items.constants import ItemCategory


class Location(TitleDescriptionModel):
    ...

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
    quantity = models.PositiveIntegerField(default=1)
    expiration_date = models.DateField(null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    @property
    def ttl(self):
        return (self.expiration_date - datetime.date.today()).days

    @property
    def compound_priority(self):
        return (self.expiration_date - datetime.date.today()).days * self.quantity

    class Meta:
        db_table = "items"
        verbose_name_plural = "items"
        ordering = ("-id",)

    def __str__(self):
        return f"{self.title}"
