import random
import typing
from abc import ABC
from unittest import skipIf, skipUnless

from authentication.models import User
from django.db.models import TextChoices
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import AccessToken


class Colors(TextChoices):
    HEADER = "\033[95m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    END = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


class BaseAPITest(APITestCase):
    def create(self, email="test@mail.com", password="qwerty123456", first_name="John", last_name="Snow"):
        user: User = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_active = True
        user.save()

        return user

    def create_and_login(self, email="test@mail.com", password="qwerty123456", first_name="John", last_name="Snow"):
        user: User = self.create(email=email, password=password, first_name=first_name, last_name=last_name)
        self.authorize(user)
        return user

    def authorize(self, user, **additional_headers):
        token = AccessToken.for_user(user)
        self.client.credentials(HTTP_AUTHORIZATION=f"{api_settings.AUTH_HEADER_TYPES[0]} {token}", **additional_headers)

    def logout(self, **additional_headers):
        self.client.credentials(**additional_headers)


class CustomClient(APIClient):
    def request(self, **request):
        print(f"{Colors.BOLD}{Colors.WARNING} {request.get('REQUEST_METHOD')}:{Colors.END} {request.get('PATH_INFO')}")
        return super().request(**request)


class BaseTestCase(ABC):
    client_class: CustomClient = CustomClient
    user = None
    client = None

    def _callTestMethod(self, method):
        class_name = self.__class__.__name__
        method_name = method.__name__
        print(
            f"{Colors.BOLD}{Colors.BLUE} {class_name}{Colors.END} -> {Colors.GREEN}{method_name}{Colors.END}",
        )
        super()._callTestMethod(method)


# TODO: Add public_methods for cases where specific views are available without auth
#  And check if get without auth will return 401
class CRUDTestCase(BaseTestCase):
    """CRUDTestCase

    Use this class to run basic CRUD test on view sets
    example usage:

    ```python
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
        methods: typing.ClassVar = ["list", "create", "update", "partial_update", "destroy"]

        def setUp(self) -> None:
            for _ in range(self.location_count):
                loc = mixer.blend(Location)
                for _ in range(self.item_count // self.location_count):
                    mixer.blend(Item, location=loc)
            self.user = self.create_and_login()
    ```
    """

    base_view = None
    queryset = None
    fake_data: typing.ClassVar = {}
    methods: typing.ClassVar = ["list", "create", "update", "partial_update"]

    def create_and_login(self, email="test@mail.com", password="qwerty123456", first_name="John", last_name="Snow"):
        user: User = self.create(email=email, password=password, first_name=first_name, last_name=last_name)
        self.authorize(user)
        return user

    def create(self, email="test@mail.com", password="qwerty123456", first_name="John", last_name="Snow"):
        user: User = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_active = True
        user.save()

        return user

    def authorize(self, user, **additional_headers):
        token = AccessToken.for_user(user)
        self.client.credentials(HTTP_AUTHORIZATION=f"{api_settings.AUTH_HEADER_TYPES[0]} {token}", **additional_headers)

    @skipIf("list" not in methods, "list method not implemented")
    def test_list(self) -> None:
        self.client.get(reverse(f"{self.base_view}-list"))

    @skipIf("create" not in methods, "create method not implemented")
    def test_create(self) -> None:
        json_response = self.client.post(reverse(f"{self.base_view}-list"), data=self.fake_data).json()
        self.assertEqual(self.queryset.filter(pk=json_response.get("id")).count(), 1)

    @skipUnless("create" not in methods, "create method not implemented")
    def test_create_not_allowed(self) -> None:
        resp = self.client.post(reverse(f"{self.base_view}-list"), data=self.fake_data)
        self.assertEqual(resp.status_code, 405)

    @skipIf("update" not in methods, "update method not implemented")
    def test_update(self) -> None:
        test_instance = self.queryset.first()
        resp = self.client.put(reverse(f"{self.base_view}-detail", args=(test_instance.id,)), data=self.fake_data)
        ser = resp.renderer_context.get("view").get_serializer_class()
        serializer = ser(data=self.fake_data)
        serializer.is_valid(raise_exception=True)
        self._check_data(serializer, test_instance, resp)

    @skipUnless("update" not in methods, "update method not implemented")
    def test_update_not_allowed(self) -> None:
        test_instance = self.queryset.first()
        resp = self.client.put(reverse(f"{self.base_view}-detail", args=(test_instance.id,)), data=self.fake_data)
        self.assertEqual(resp.status_code, 405)

    @skipIf("partial_update" not in methods, "partial_update method not implemented")
    def test_partial_update(self) -> None:
        test_instance = self.queryset.first()
        rand_index = random.randrange(0, len(self.fake_data))
        payload = {**dict(list(self.fake_data.items())[:rand_index])}
        resp = self.client.patch(reverse(f"{self.base_view}-detail", args=(test_instance.id,)), data=payload)
        ser = resp.renderer_context.get("view").get_serializer_class()
        serializer = ser(test_instance, data=payload, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self._check_data(serializer, test_instance, resp)

    @skipUnless("partial_update" not in methods, "partial_update method not implemented")
    def test_partial_update_not_allowed(self) -> None:
        test_instance = self.queryset.first()
        rand_index = random.randrange(0, len(self.fake_data))
        payload = {**dict(list(self.fake_data.items())[:rand_index])}
        resp = self.client.patch(reverse(f"{self.base_view}-detail", args=(test_instance.id,)), data=payload)
        self.assertEqual(resp.status_code, 405)

    @skipIf("destroy" not in methods, "destroy method not implemented")
    def test_destroy(self) -> None:
        test_instance = self.queryset.first()
        self.client.delete(reverse(f"{self.base_view}-detail", args=(test_instance.id,)))
        self.assertEqual(self.queryset.filter(pk=test_instance.pk).count(), 0)

    @skipUnless("destroy" not in methods, "destroy method not implemented")
    def test_destroy_not_allowed(self) -> None:
        test_instance = self.queryset.first()
        resp = self.client.delete(reverse(f"{self.base_view}-detail", args=(test_instance.id,)))
        self.assertEqual(resp.status_code, 405)

    def _check_data(self, serializer, test_instance, resp):
        """_check_data

        Checks payload data via serializer and compares with response

        Args:
            serializer (serializer): Serializer from view
            test_instance (model): Model instance
            resp (response): response

        """
        result = serializer.data
        test_instance.refresh_from_db()
        for field, value in result.items():
            self.assertEqual(str(resp.data.get(field)), str(value))
