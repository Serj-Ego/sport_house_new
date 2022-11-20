import json

from rest_framework import filters


class LocationSportTypeFilter(filters.BaseFilterBackend):
    """Фильтр по категории спорта."""

    def filter_queryset(self, request, queryset, view):
        data = request.query_params.get("sport_type", None)
        if data:
            queryset = queryset.filter(sports__id__in=data)
        return queryset
