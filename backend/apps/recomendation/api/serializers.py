from rest_framework import serializers

from apps.base.models import SportType, SportTypeСontraindication
from apps.user.models import UserRecommendation


# class SportTypeSerializer(serializers.ModelSerializer):
#     """Сериализатор видов спорта"""
#
#     class Meta:
#         model = SportType
#         fields = (
#             "id",
#             "name",
#             "description",
#         )
#
#
# class SportTypeContraindicationSerializer(serializers.ModelSerializer):
#     """Сериализатор видов спорта"""
#
#     class Meta:
#         model = SportTypeСontraindication
#         fields = (
#             "id",
#             "name",
#             "description",
#         )


class RecommendationSerializer(serializers.Serializer):
    """Сериализатор рекомендаций пользователя"""

    id = serializers.CharField()
    name = serializers.CharField()
    description = serializers.CharField()


class UserRecommendationSerializer(serializers.ModelSerializer):
    """Сериализатор рекомендаций пользователя"""

    sport = RecommendationSerializer(many=True)
    no_rec_sport = RecommendationSerializer(many=True)
    breakfast = RecommendationSerializer(many=True)
    lunch = RecommendationSerializer(many=True)
    dinner = RecommendationSerializer(many=True)

    class Meta:
        model = UserRecommendation
        fields = "__all__"
