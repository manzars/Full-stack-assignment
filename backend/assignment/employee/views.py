from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from employee.models import Employee
from employee.serializers import EmployeeCreateSerializer
from rest_framework.response import Response

class CreateEmployeeView(generics.CreateAPIView):
    model = Employee
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeCreateSerializer

class EmployeList(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeCreateSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = EmployeeCreateSerializer(queryset, many=True)
        return Response(serializer.data)

class DeleteEmployeeView(generics.DestroyAPIView):
    model = Employee
    queryset = Employee.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeCreateSerializer

class UpdateEmployeeView(generics.UpdateAPIView):
    model = Employee
    queryset = Employee.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeCreateSerializer