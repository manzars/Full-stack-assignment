from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
import json

from account.api.serializers import RegisterSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(View):
    @csrf_exempt
    def login(self, request):
        if request.method == 'POST':
            response = {}
            username = request.POST.get('username')
            password = request.POST.get('password')

            try:
                user = User.objects.get(username=username)
                if user.check_password(password):
                    response = {
                        'pk': user.pk,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'username': user.username,
                        'email': user.email
                    }
                    return JsonResponse(response, status = 200, safe=True)
                else:
                    return JsonResponse({'error': "Password not matched"}, status=404)
            except User.DoesNotExist:
                return JsonResponse({'error': "Username not found"}, status=404)
                  
        else:
            return JsonResponse({'error': "Request not allowed"}, status=404)

class RetriveUser(View):
    @csrf_exempt
    def retrive(self, request):
        if request.method == 'POST':
            response = {}
            token = request.POST.get('token')
            try:
                user = Token.objects.get(key=token).user
                print(user)
                response = {
                        'pk': user.pk,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'username': user.username,
                        'email': user.email
                    }
                return JsonResponse(response, status = 200, safe=True)
            except:
                return JsonResponse({'error': "Token not found"}, status=404)
        else:
            return JsonResponse({'error': "Request not allowed"}, status=404)

        
