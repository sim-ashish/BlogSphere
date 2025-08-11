from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from users.models import CustomUser

# Create your views here.

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
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')

        if len(username) == 0 or len(email) == 0 or len(password) == 0:
            messages.error(request, 'All fields are required')
            return redirect('register')
        
        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return redirect('register')
        
        try:
            user = CustomUser.objects.create_user(username=username, email=email, password=password)
            user.save()
            messages.success(request, 'Registration successful')
            return redirect('login')
        except Exception as e:
            messages.error(request, f'Registration failed: {str(e)}')
            return redirect('register')
        
    return render(request, 'register.html')

def forgotPassword(request):
    return render(request, 'forgot-password.html')

@login_required
def logout_user(request):
    logout(request)
    messages.success(request, 'logout success')
    return redirect('login')