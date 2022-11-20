from django.shortcuts import render
from rest_framework import status

# Create your views here.
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.ai.tasks import calculate_recomendation
from apps.recomendation.api.serializers import UserRecommendationSerializer


class RecomendationUserRetrieveAPIVIew(RetrieveAPIView):
    """Возвращает последнюю рассчитанную рекомендацию"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserRecommendationSerializer
    queryset = None

    def get_object(self):
        return self.request.user.get_last_recommendation


class StartCalculationUserRecAPIView(APIView):
    """Запуск расчета рекомендации для пользователя"""

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        calculate_recomendation.apply_async(kwargs={"user": user.id})
        return Response(data={"message": "success"}, status=status.HTTP_200_OK)
