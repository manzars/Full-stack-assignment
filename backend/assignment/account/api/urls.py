from django.urls import path
from account.api.views import UserCreate
from rest_framework.authtoken.views import obtain_auth_token
from .views import LoginView, RetriveUser

login = LoginView()
retrive = RetriveUser()
urlpatterns = [
    path('account/register', UserCreate.as_view()),
    path('account/gettoken', obtain_auth_token),
    path('account/login', login.login),
    path('account/retrive', retrive.retrive)
]