from django.contrib import admin
from blog.models import BlogPost
from simple_history.admin import SimpleHistoryAdmin
# Register your models here.


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')


# @admin.register(BlogPost)
# class MyModelAdmin(SimpleHistoryAdmin):
#     pass
