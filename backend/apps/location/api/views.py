# Create your views here.
import json

from django.db.models import Subquery, OuterRef
from django.http import Http404
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.base.models import RoleConst, StatusConst
from apps.base.permissions import HasGroupPermission
from apps.location.api.filters import LocationSearchFilter
from apps.location.api.serializers import (
    LocationCreateSerializer,
    LocationOwnerListSerializer,
    LocationRetrieveOwnerSerializer,
    LocationMapSerializer, LocationCheckDateSerializer, LocationCheckTimeEnrollSerializer,
)
from apps.location.models import Location, ListLocationStatus


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


class LocationOwnerListAPIVIew(ListAPIView):
    """Список спортивных площадок у создателя"""

    permission_classes = (
        IsAuthenticated,
        HasGroupPermission,
    )
    pagination_class = None
    permission_groups = (RoleConst.SPORT_AREA,)
    serializer_class = LocationOwnerListSerializer
    filter_backends = [LocationSearchFilter]
    queryset = None

    def get_queryset(self):
        return Location.objects.filter(owner=self.request.user).order_by(
            "-created_date"
        )


class LocationOwnerChangeStatusUpdateAPIView(UpdateAPIView):
    """Обновление статуса у спортивной площадки создателем"""

    permission_classes = (
        IsAuthenticated,
        HasGroupPermission,
    )
    pagination_class = None
    permission_groups = (RoleConst.SPORT_AREA,)
    serializer_class = LocationRetrieveOwnerSerializer
    queryset = Location.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {"user": self.request.user}


class LocationOwnerRetrieveAPIView(RetrieveAPIView):
    """Возвращает детальную информацию о площадке его создателю"""

    permission_classes = (
        IsAuthenticated,
        HasGroupPermission,
    )
    permission_groups = (RoleConst.SPORT_AREA,)
    queryset = Location.objects.all()
    serializer_class = LocationRetrieveOwnerSerializer

    def get_object(self):
        if location := Location.objects.filter(
            id=self.kwargs.get("pk"), owner=self.request.user
        ).first():
            return location
        else:
            raise Http404


class LocationUserMapListAPIView(ListAPIView):
    """Список спортивных площадок на карте пользователя"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    serializer_class = LocationMapSerializer

    def get_queryset(self):
        return Location.objects.annotate(
            last_status_name=Subquery(
                ListLocationStatus.objects.filter(location=OuterRef("pk"))
                .order_by("-created_date")
                .values("status__name")[:1]
            )
        ).filter(last_status_name=StatusConst.PUBLISHED, is_blocked=False)


class LocationCheckCalendarDate(RetrieveAPIView):
    """"""

    permission_classes = (IsAuthenticated,)
    serializer_class = LocationCheckDateSerializer
    queryset = Location.objects.all()


class LocationCheckTimeEnroll(RetrieveAPIView):
    """"""

    permission_classes = (IsAuthenticated,)
    queryset = Location.objects.all()
    serializer_class = LocationCheckTimeEnrollSerializer

    def get_serializer_context(self):
        return {"day": self.request.query_params.get('day')}