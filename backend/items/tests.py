import random
import typing
from unittest import skipIf

from django.conf import settings
from django.test import TestCase
from django.urls import reverse
from expiration_tracker.tests import CRUDTestCase
from mixer.backend.django import mixer

from items.models import Item, Location


class ItemVewSetTest(CRUDTestCase, TestCase):
    base_view = "items:items"
    queryset = Item.objects.all()
    location_count = 20
    item_count = 100
    fake_data: typing.ClassVar = {
        "title": "test",
        "category": "GOODS",
        "quantity": 1,
        "location": random.randint(1, location_count),
        "expiration_date": "2022-12-12",
    }
    methods: typing.ClassVar = ["list", "retrieve", "create", "update", "partial_update"]

    def setUp(self) -> None:
        for _ in range(self.location_count):
            loc = mixer.blend(Location)
            for _ in range(self.item_count // self.location_count):
                mixer.blend(Item, location=loc)
        self.user = self.create_and_login()
        self.barcode = "7622300465674"

    @skipIf(True, "Search without mock")
    def test_search(self):
        resp = self.client.post(reverse(f"{self.base_view}-search"), data={"barcode": self.barcode})
        self.assertEqual(resp.status_code, 200)

    @skipIf(True, "Search without mock")
    def test_search_throttle(self):
        rate = settings.REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"]["search"]
        for _ in range(int(rate.split("/")[0])):
            self.client.post(reverse(f"{self.base_view}-search"), data={"barcode": self.barcode})
        resp = self.client.post(reverse(f"{self.base_view}-search"), data={"barcode": self.barcode})
        self.assertEqual(resp.status_code, 429)
