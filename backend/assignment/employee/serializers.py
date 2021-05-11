from rest_framework import serializers
from django.contrib.auth.models import User
from employee.models import Employee

class EmployeeCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = ('pk', 'user', 'salary', 'last_company', 'document',)

    def create(self, validated_data):
        employee = Employee(**validated_data)
        employee.save()
        return employee