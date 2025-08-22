from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.paginator import Paginator
from blog.models import BlogPost
from django.shortcuts import get_object_or_404
from blog.customdecorator import approved_blog_required
from blog.forms import BlogPostForm
import logging
import os
import dataclasses
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
from django.utils.crypto import get_random_string
from django.db import connection
from .forms import UploadImageForm

# Configure logging
logging.basicConfig(level=logging.DEBUG)


@dataclasses.dataclass
class Color:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'


def index(request):
    return render(request, 'index.html')

def fetch_blogs(request):
    page_number = request.GET.get('page', 1)

    # Clear previous queries
    connection.queries.clear()

    blogs = BlogPost.objects.filter(admin_approved = True)          #.order_by('?')  # Or any order

    if connection.queries:
        logging.info(f"{Color.RED}Fetch blogs from DB : ✅{Color.RESET}")
    else:
        logging.info(f"{Color.GREEN}Fetch blogs from Cache, No DB hit ❌{Color.RESET}")

    paginator = Paginator(blogs, 10)  # 10 items per page

    try:
        page_obj = paginator.page(page_number)
    except:
        # If page is invalid, return empty list
        return JsonResponse({'blogs': [], 'has_next': False})

    for blog in page_obj:
        if blog.thumbnail:
            logging.info(f"{Color.YELLOW}Blog URL : {blog.thumbnail.url}{Color.RESET}")

    blogs_data = [
        {
            'id': blog.id,
            'slug': blog.slug,
            'title': blog.title,
            'thumbnail':blog.thumbnail.url if blog.thumbnail else None,
            'author': blog.author.username,
            'likes':blog.total_likes,
            'created_at':blog.created_at.strftime("%d-%m-%Y")
        } for blog in page_obj
    ]

    return JsonResponse({
        'blogs': blogs_data,
        'has_next': page_obj.has_next(),
    })

@login_required
def createBlog(request):
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES)
        if form.is_valid():
            blog_post = form.save(commit=False)
            blog_post.author = request.user 
            blog_post.save()
            messages.success(request, 'Blog created')
            return redirect('home') 
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = BlogPostForm()
    return render(request, 'new-blog.html', {'form': form})


@approved_blog_required
def detailBlog(request, author, blog_slug):
    liked = False
    blog = get_object_or_404(BlogPost, author__username = author, slug = blog_slug)
    if request.user.is_authenticated:
        liked = request.user in blog.likes.all()
    else:
        liked = False
    return render(request, 'blog-detail.html', {'blog': blog, 'liked': liked})


@login_required
def like_unlike_blog(request, blog_id):
    blog = get_object_or_404(BlogPost, id=blog_id)
    if request.user in blog.likes.all():
        blog.likes.remove(request.user)
        liked = False
    else:
        blog.liked_by.add(request.user)
        liked = True
    blog.save()
    return JsonResponse({'liked': liked, 'total_likes': blog.total_likes})



# Image Upload Test View
def test_upload_view(request):
    uploaded_url = None

    if request.method == 'POST':
        form = UploadImageForm(request.POST, request.FILES)
        if form.is_valid():
            uploaded_image = form.save()  # Saves to Cloudinary
            uploaded_url = uploaded_image.image.url  # Now you can access the URL
    else:
        form = UploadImageForm()

    return render(request, 'test_upload.html', {
        'form': form,
        'uploaded_url': uploaded_url,
    })
