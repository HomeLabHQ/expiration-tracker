from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        attrs["email"] = attrs["email"].lower()
        return super().validate(attrs)


class JWTAuthResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()


class SignUpSerializer(serializers.ModelSerializer):
    """Create new user when sign up"""

    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(
        required=False,
        allow_blank=True,
    )
    last_name = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
        )
        write_only_fields = ("password",)

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            error = f"User with the email '{value}' already exists"
            raise serializers.ValidationError(error)
        return value

    def validate_first_name(self, value):
        if not value.isascii():
            raise serializers.ValidationError("Only english letters are allowed")
        return value

    def validate_last_name(self, value):
        if not value.isascii():
            raise serializers.ValidationError("Only english letters are allowed")
        return value

    def create(self, validated_data, is_dealer=False):
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")
        user = User.objects.create(
            email=validated_data["email"],
            first_name=first_name,
            last_name=last_name,
            is_active=True,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
