from django.db import models
from django.conf import settings
from blog.utils import generate_unique_slug
from django_ckeditor_5.fields import CKEditor5Field

# class BlogPost(models.Model):
#     title = models.CharField(max_length=200)
#     content = RichTextField() 

class BlogPost(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='blog_posts'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    thumbnail = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    content = CKEditor5Field('Content', config_name='extends')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)
    admin_approved = models.BooleanField(default=False)
    
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='liked_posts',
        blank=True
    )

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, 'slug', self.title)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.title
    @property
    def total_likes(self):
        return self.likes.count()