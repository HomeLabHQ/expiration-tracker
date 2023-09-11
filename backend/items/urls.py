from rest_framework.routers import SimpleRouter

from items.views import ItemViewSet, LocationViewSet

app_name = "items"
router = SimpleRouter()
router.register("locations", LocationViewSet, basename="locations")
router.register("items", ItemViewSet, basename="items")

urlpatterns = [*router.urls]
