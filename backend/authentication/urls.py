from django.urls import path

from authentication.views import (
    ObtainJSONWebToken,
    RefreshJSONWebToken,
    SignUpView,
    VerifyJSONWebToken,
)

app_name = "authentication"

urlpatterns = [
    path("", ObtainJSONWebToken.as_view(), name="auth"),
    path("refresh/", RefreshJSONWebToken.as_view(), name="auth-refresh"),
    path("register/", SignUpView.as_view(), name="auth-register"),
    path("verify/", VerifyJSONWebToken.as_view(), name="auth-verify"),
]
