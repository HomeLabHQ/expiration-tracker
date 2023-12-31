import typing
from unittest import skipIf

from authentication.models import User
from core.tests import CRUDTestCase
from django.conf import settings
from django.test import TestCase
from django.urls import reverse
from faker import Faker
from mixer.backend.django import mixer

from items.constants import ItemStatus
from items.models import Item, Location

fake: Faker = Faker()


class ItemVewSetTest(CRUDTestCase, TestCase):
    base_view = "items:items"
    queryset = Item.objects.all()
    location_count = 20
    item_count = 100
    methods: typing.ClassVar = ["list", "retrieve", "create", "update", "partial_update"]

    def setUp(self) -> None:
        for _ in range(self.location_count):
            loc = mixer.blend(Location)
            for _ in range(self.item_count // self.location_count):
                mixer.blend(Item, location=loc, opening_date=None)
        self.user: User = self.create_and_login()
        self.barcode = "7622300465674"
        self.fake_data = {
            "title": fake.name(),
            "category": "GOODS",
            "location": Location.objects.first().id,
            "expiration_date": "2022-12-12",
        }

    def test_choices(self):
        resp = self.client.get(reverse(f"{self.base_view}-choices"))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data), 2)

    def test_list_not_disposed(self):
        location_qs = Location.objects
        Item.objects.filter(location=location_qs.last()).update(status=ItemStatus.DISPOSED.name)
        Item.objects.filter(location=location_qs.first()).update(status=ItemStatus.USED.name)
        resp = self.client.get(reverse(f"{self.base_view}-list"))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data["count"], self.item_count - 2 * (self.item_count // self.location_count))

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


class LocationVewSetTest(CRUDTestCase, TestCase):
    base_view = "items:locations"
    queryset = Location.objects.all()
    location_count = 20
    fake_data: typing.ClassVar = {
        "title": fake.name(),
        "description": fake.name(),
    }
    methods: typing.ClassVar = ["list", "retrieve", "create"]

    def setUp(self) -> None:
        for _ in range(self.location_count):
            mixer.blend(Location)
        self.user = self.create_and_login()
