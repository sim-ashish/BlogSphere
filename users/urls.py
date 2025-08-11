from django.urls import path
from users.views import (login_user,
                        register,
                        forgotPassword,
                        logout_user)

urlpatterns = [
    path('login', login_user, name='login'),
    path('register', register, name='register'),
    path('forgot-password', forgotPassword, name='forgot_password'),
    path('logout', logout_user, name='logout'),
]