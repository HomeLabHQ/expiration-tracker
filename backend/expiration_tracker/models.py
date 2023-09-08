from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class DescriptionModel(models.Model):
    description = models.TextField(blank=True)

    class Meta:
        abstract = True


class TitleModel(models.Model):
    """Title

    Model with extra ``title`` field that is required

    """

    title = models.CharField(max_length=50)

    class Meta:
        abstract = True


class TitleDescriptionModel(TitleModel, DescriptionModel):
    """TitleDescriptionModel

    This models contains:

    ``title`` and optional ``description`` field to use in your models

    """

    class Meta:
        abstract = True
