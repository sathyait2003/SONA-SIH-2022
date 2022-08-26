from django.urls import path
from login import views

urlpatterns = [
    path('signup/',views.signup),
    path('register/',views.register),
    path('fetch_role_id', views.fetch_role_id),
    path('logout/',views.logout)
    # path('email/',views.send_mail_after_registration)
]
