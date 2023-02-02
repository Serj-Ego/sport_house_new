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
from rest_framework.views import APIView

from apps.base.models import RoleConst, StatusConst
from apps.base.permissions import HasGroupPermission
from apps.location.api.filters import LocationSearchFilter
from apps.location.api.serializers import (
    LocationCreateSerializer,
    LocationOwnerListSerializer,
    LocationRetrieveOwnerSerializer,
    LocationMapSerializer,
    LocationCheckDateSerializer,
    LocationCheckTimeEnrollSerializer,
    BookingLocationCreateSerializer,
    BookingListSerializer,
)
from apps.location.models import Location, ListLocationStatus, BookingLocation
from apps.user.utils.notification import send_user_notification


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
        return {"day": self.request.query_params.get("day")}


class BookingLocationCreateAPIView(CreateAPIView):
    """Создание бронирования"""

    permission_classes = (IsAuthenticated,)
    serializer_class = BookingLocationCreateSerializer
    queryset = BookingLocation.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {"user": self.request.user, "location_id": self.kwargs.get("pk")}


class BookingUserListAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = BookingListSerializer
    queryset = None
    pagination_class = None

    def get_queryset(self):
        if RoleConst.SPORTSMAN in self.request.user.groups.all().values_list(
            "name", flat=True
        ):
            return BookingLocation.objects.filter(creator=self.request.user).order_by(
                "-id"
            )
        if RoleConst.SPORT_AREA in self.request.user.groups.all().values_list(
            "name", flat=True
        ):
            return BookingLocation.objects.filter(
                id__in=self.request.user.location_set.all().values_list(
                    "bookings__id", flat=True
                )
            )


class BookingChangeStatus(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        item = BookingLocation.objects.get(id=kwargs.get("pk"))
        item.add_status(
            request.user, request.data["status_name"], request.data["commentary"]
        )
        if request.user.id != item.creator.id:
            send_user_notification(
                item.creator,
                "Статус заявки изменен",
                f"{item.date} ({item.start_event}-{item.end_event})",
            )
        return Response(BookingListSerializer(item).data, status=status.HTTP_200_OK)
