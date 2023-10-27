from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authentication.serializers import CustomTokenObtainPairSerializer, JWTAuthResponseSerializer


@extend_schema_view(
    post=extend_schema(responses=OpenApiResponse(JWTAuthResponseSerializer)),
)
class ObtainJSONWebToken(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class VerifyJSONWebToken(TokenVerifyView):
    serializer_class = TokenVerifySerializer


class RefreshJSONWebToken(TokenRefreshView):
    serializer_class = TokenRefreshSerializer
