from rest_framework.decorators import action
from rest_framework.response import Response


class ListSerializerMixin:
    """Use this mixin to be able to define list_serializer_class that
    will be used only for list action"""

    list_serializer_class = None
    serializer_class = None

    list_queryset = None
    queryset = None

    def get_serializer_class(self):
        assert self.list_serializer_class, "Use must set 'list_serializer_class' in order to use ListSerializerMixin"
        if self.action == "list":
            return self.list_serializer_class
        else:
            return super().get_serializer_class()

    def get_queryset(self):
        if self.action == "list" and self.list_queryset is not None:
            return self.list_queryset
        else:
            return super().get_queryset()


class ChoiceMixin:
    all_choices = None

    @action(detail=False, methods=["GET"])
    def choices(self, request, *args, **kwargs):
        """Use this mixin if you have some choices that need to be send to frontend
        this action will import dynamic all choices user send in type query
        and return its choices
        """
        data = [{"field": v[0], "values": [item.name for item in v[1]]} for v in self.all_choices.items()]
        return Response(data=data, status=200)