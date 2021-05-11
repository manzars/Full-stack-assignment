from django.urls import path
from employee.views import CreateEmployeeView, EmployeList, DeleteEmployeeView, UpdateEmployeeView

urlpatterns = [
    path('employee/create/', CreateEmployeeView.as_view()),
    path('employee/all/', EmployeList.as_view()),
    path('employee/delete/<pk>/', DeleteEmployeeView.as_view()),
    path('employee/update/<pk>/', UpdateEmployeeView.as_view())
]