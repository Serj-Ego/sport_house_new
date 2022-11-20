import json

import requests
from django.conf import settings

from apps.base.models import NotificationTypeConst, NotificationType
from apps.user.models import UserNotification


def send_user_notification(user, title, body, type=NotificationTypeConst.OTHER):
    """
    Отправляет уведомление пользователю
    """
    badge_count = (
        user.user_notification.filter(delivered=True, is_read=False).count() + 1
    )
    data = {
        "to": user.notification_token,
        "sound": "default",
        "title": title,
        "body": body,
        "badge": badge_count,
    }
    notification = UserNotification.objects.create(
        title=title, body=body, type=NotificationType.objects.get(name=type)
    )
    user.user_notification.add(notification)

    response = requests.post(
        settings.EXPO_PUSH_NOTIFICATION_URL,
        headers=settings.EXPO_PUSH_NOTIFICATION_HEADERS,
        json=data,
    )
    if response.ok:
        res_data = json.loads(response.text)
        notification.delivered = True
        notification.notification_id = res_data["data"].get("id")
        notification.save()
    else:
        notification.delivered = False
        notification.save()
