from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    salary = models.CharField(max_length=50, null=True, blank=True)
    last_company = models.CharField(max_length=100, null=True, blank=True)
    document = models.ImageField(upload_to = 'document/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}"