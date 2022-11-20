from django.test import TestCase

from django.contrib.auth import get_user_model
from django.test import Client

User = get_user_model()


class TestUserLoginWithToken(TestCase):
    """Проверка авториазции пользователя через токен"""

    def setUp(self) -> None:
        if User.objects.filter(username="test1").first():
            pass
        else:
            User.objects.create_user("test1", "test1@test.ru", "Test1234")
        self.client = Client()

    def test_client_login_user(self):
        response = self.client.post(
            "/api/user/login/", {"username": "test1", "password": "Test1234"}
        )
        self.assertEqual(response.status_code, 200)
