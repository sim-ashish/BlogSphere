from django.urls import path
from blog.views import (index,
                        fetch_blogs,
                        detailBlog,
                        createBlog,)

urlpatterns = [
    path('', index, name='home'),
    path('blogs/',fetch_blogs, name='blogs'),
    path('create', createBlog, name='create'),
    path('detail/<str:author>/<slug:blog_slug>', detailBlog, name='detail'),
]