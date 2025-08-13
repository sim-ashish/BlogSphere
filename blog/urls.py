from django.urls import path
from blog.views import (index,
                        fetch_blogs,
                        detailBlog,
                        createBlog,
                        test_upload_view)
from django.conf import settings

urlpatterns = [
    path('', index, name='home'),
    path('blogs/',fetch_blogs, name='blogs'),
    path('create', createBlog, name='create'),
    path('detail/<str:author>/<slug:blog_slug>', detailBlog, name='detail'),
]

if settings.BRANCH == 'local':
    urlpatterns += [
        path('upload-test/', test_upload_view, name='upload_test'),
    ]