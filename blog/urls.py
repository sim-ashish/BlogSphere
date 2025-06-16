from django.urls import path
from blog.views import (index,
                        fetch_blogs,
                        login_user,
                        logout_user,
                        register,
                        detailBlog,
                        forgotPassword,
                        createBlog)

urlpatterns = [
    path('', index, name='home'),
    path('blogs/',fetch_blogs, name='blogs'),
    path('login', login_user, name='login'),
    path('register', register, name='register'),
    path('create', createBlog, name='create'),
    path('forgot-password', forgotPassword, name='forgot_password'),
    path('detail/<str:author>/<slug:blog_slug>', detailBlog, name='detail'),
    path('logout', logout_user, name='logout')
]