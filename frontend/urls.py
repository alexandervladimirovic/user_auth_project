from django.urls import path
from django.shortcuts import render


app_name = 'frontend'


urlpatterns = [
    path('login/', lambda request: render(request, 'frontend/login.html'), name='login-page'),
    path('registration/', lambda request: render(request, 'frontend/registration.html'), name='registration-page'),
    path('dashboard/', lambda request: render(request, 'frontend/dashboard.html'), name='dashboard-page'),
    
]