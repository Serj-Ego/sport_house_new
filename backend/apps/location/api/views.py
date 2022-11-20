import json

from django.shortcuts import render

# Create your views here.
from rest_framework import filters, status
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.location.api.filters import LocationSportTypeFilter
from apps.location.api.serializers import (
    LocationSportTypeSerializer,
    LocationCategorySerializer,
    LocationCreateSerializer,
    LocationOwnerListSerializer,
    LocationForUserSerializer,
)
from apps.location.models import LocationSportType, Location, LocationCategory


class LocationCategoryListAPIView(ListAPIView):
    """Отдает список категорий площадки"""

    pagination_class = None
    permission_classes = (IsAuthenticated,)
    queryset = LocationCategory.objects.all()
    serializer_class = LocationCategorySerializer


class LocationSportTypeListAPIView(ListAPIView):
    """Отдает список категорий спорта"""

    pagination_class = None
    permission_classes = (IsAuthenticated,)
    queryset = LocationSportType.objects.all()
    serializer_class = LocationSportTypeSerializer


class LocationCreateAPIView(APIView):
    """Создание новой спортивной площадки"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if request.data.__len__() == 2:
            data = json.loads(request.data.pop("data")[0])
            data["images"] = request.data.pop("images", None)
        else:
            data = request.data
        serializer = LocationCreateSerializer(
            data=data,
            context={
                "user": self.request.user,
            },
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({}, status=status.HTTP_200_OK)


class LocationListAPIView(ListAPIView, UpdateAPIView):
    """Вывод спортивных площадок"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    queryset = Location.objects.all()
    serializer_class = LocationOwnerListSerializer

    def get_queryset(self):
        return Location.objects.filter(owner=self.request.user).order_by("-id")

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {
            "user": self.request.user,
        }


class LocationForUserListAPIView(ListAPIView):
    """Список спортивных площадок для пользователя на карте"""

    permission_classes = (IsAuthenticated,)
    pagination_class = None
    queryset = Location.objects.all()
    serializer_class = LocationForUserSerializer
