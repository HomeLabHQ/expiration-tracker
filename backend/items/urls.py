from rest_framework.routers import SimpleRouter

from items.views import ItemViewSet, LocationViewSet

app_name = "items"
router = SimpleRouter()

router.register("", ItemViewSet, basename="items")
router.register("locations/", LocationViewSet, basename="locations")
urlpatterns = [*router.urls]
