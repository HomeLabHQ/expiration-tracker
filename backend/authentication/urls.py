from django.urls import path

from authentication.views import (
    ObtainJSONWebToken,
    RefreshJSONWebToken,
    VerifyJSONWebToken,
)

app_name = "authentication"

urlpatterns = [
    path("", ObtainJSONWebToken.as_view(), name="auth"),
    path("refresh/", RefreshJSONWebToken.as_view(), name="auth-refresh"),
    path("verify/", VerifyJSONWebToken.as_view(), name="auth-verify"),
]
