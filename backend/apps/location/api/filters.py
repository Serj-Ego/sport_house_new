from django.db.models import Q
from rest_framework import filters


class LocationSportTypeFilter(filters.BaseFilterBackend):
    """Фильтр по категории спорта."""

    def filter_queryset(self, request, queryset, view):
        data = request.query_params.get("sport_type", None)
        if data:
            queryset = queryset.filter(sports__id__in=data)
        return queryset


class LocationSearchFilter(filters.BaseFilterBackend):
    """Поиск спортивной площадки."""

    def filter_queryset(self, request, queryset, view):
        data = request.query_params.get("search", None)
        if data:
            queryset = queryset.filter(
                Q(full_name__icontains=data)
                | Q(short_name__icontains=data)
                | Q(description__icontains=data)
            )
        return queryset
