import typing

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password):
        """Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError(_("Users must have an email address"))

        user: User = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password):
        """Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user: User = self.create_user(
            email,
            first_name,
            last_name,
            password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(verbose_name=_("email address"), max_length=255, unique=True)
    is_staff = models.BooleanField(
        default=False,
        help_text=_("Designates whether this user can access this admin site."),
        verbose_name=_("is staff"),
    )
    is_active = models.BooleanField(
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active.Unselect this instead of deleting accounts.",
        ),
        verbose_name=_("is active"),
    )
    is_superuser = models.BooleanField(
        default=False,
        help_text=_("Designates that this user has all permissions without explicitly assigning them."),
        verbose_name=_("is superuser"),
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: typing.ClassVar = ["first_name", "last_name"]

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return f"{self.id}, {self.email}"

    def has_perm(self, perm, obj=None) -> bool:
        """
        Return True if the user has the specified permission. Query all
        available auth backends, but return immediately if any backend returns
        True. Thus, a user who has permission from a single auth backend is
        assumed to have permission in general. If an object is provided, check
        permissions for that object.
        """
        # Active superusers have all permissions.
        if self.is_active and self.is_staff:
            return True

        # Otherwise we need to check the backends.
        return super().has_perm(perm, obj)

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        # Second simplest possible answer: yes, if user is staff
        return self.is_staff

    class Meta:
        db_table = "users"
        verbose_name = _("user")
        verbose_name_plural = _("users")
