# Create your views here.
import json

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.base.models import RoleConst
from apps.base.permissions import HasGroupPermission
from apps.location.api.serializers import LocationCreateSerializer
from apps.location.models import Location


class LocationCreateAPIView(CreateAPIView):
    """Создание новой спортивной площадки"""

    permission_classes = (
        IsAuthenticated,
        HasGroupPermission,
    )
    permission_groups = (RoleConst.SPORT_AREA,)
    serializer_class = LocationCreateSerializer
    queryset = Location.objects.all()

    def post(self, request, *args, **kwargs):
        data = json.loads(request.data.pop("data")[0])
        data["images"] = request.data.pop("images", None)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(data={}, status=status.HTTP_201_CREATED)

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {"user": self.request.user, "request": self.request}


# class LocationForUserListAPIView(ListAPIView):
#     """Список спортивных площадок для пользователя на карте"""
#
#     permission_classes = (IsAuthenticated,)
#     pagination_class = None
#     queryset = Location.objects.all()
#     serializer_class = LocationForUserSerializer
