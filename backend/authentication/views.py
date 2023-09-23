from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authentication.serializers import CustomTokenObtainPairSerializer, JWTAuthResponseSerializer, SignUpSerializer


@extend_schema_view(
    post=extend_schema(responses=OpenApiResponse(JWTAuthResponseSerializer)),
)
class ObtainJSONWebToken(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class VerifyJSONWebToken(TokenVerifyView):
    serializer_class = TokenVerifySerializer


class RefreshJSONWebToken(TokenRefreshView):
    serializer_class = TokenRefreshSerializer


class SignUpView(CreateAPIView):
    """
    Register new user in the system

    You need to provide `email`, `first_name`, `last_name`, `password_repeated`
    """

    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer
