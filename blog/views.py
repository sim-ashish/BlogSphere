from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.paginator import Paginator
from blog.models import BlogPost
from django.shortcuts import get_object_or_404
from blog.customdecorator import approved_blog_required

# Create your views here.


def index(request):
    return render(request, 'index.html')

def fetch_blogs(request):
    page_number = request.GET.get('page', 1)
    blogs = BlogPost.objects.filter(admin_approved = True).order_by('?')  # Or any order

    paginator = Paginator(blogs, 10)  # 10 items per page

    try:
        page_obj = paginator.page(page_number)
    except:
        # If page is invalid, return empty list
        return JsonResponse({'blogs': [], 'has_next': False})

    blogs_data = [
        {
            'id': blog.id,
            'slug': blog.slug,
            'title': blog.title,
            'thumbnail':blog.thumbnail.url if blog.thumbnail.url else None,
            'author': blog.author.username,
            'likes':blog.total_likes,
            'created_at':blog.created_at.strftime("%d-%m-%Y")
        } for blog in page_obj
    ]

    return JsonResponse({
        'blogs': blogs_data,
        'has_next': page_obj.has_next(),
    })

def login_user(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        user_password = request.POST.get('password')
        user = authenticate(email=user_email, password=user_password)
        if user is not None:
            login(request, user)
            messages.success(request, 'login success')
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('login')
    return render(request, 'login.html')

def register(request):
    if request.method == 'POST':
        print(request.body)
    return render(request, 'register.html')

def forgotPassword(request):
    return render(request, 'forgot-password.html')

@login_required
def createBlog(request):
    return render(request, 'new-blog.html')

@approved_blog_required
def detailBlog(request, author, blog_slug):
    blog = get_object_or_404(BlogPost, author__username = author, slug = blog_slug)
    return render(request, 'blog-detail.html', locals())

@login_required
def logout_user(request):
    logout(request)
    messages.success(request, 'logout success')
    return redirect('login')