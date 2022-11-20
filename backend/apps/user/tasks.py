from apps.user.models import User
from config.celery_app import app
from django.core.mail import send_mail


@app.task()
def send_email_confirm_code(email, code):
    send_mail(
        "Код-подтверждения регистрации в приложении SportHouse",
        f"Здравствуйте!\n\n Ваш код подтверждения: \n\n{code}",
        None,
        [email],
        fail_silently=False,
    )
