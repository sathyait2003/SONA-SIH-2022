from django.urls import path,re_path
#from django.conf.urls import  url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.home, name='home'),
    re_path(r'^complaint_status/(?P<complain_id>\d+)/$',views.complaint_status),
    re_path(r'^complaint_code/',views.complaint_status_code),
    re_path(r'^domain/',views.domain_list),
    re_path(r'^sort_rating/', views.sorted_rating),
    re_path(r'^price_asc/', views.desc_price),
    re_path(r'^price_desc/', views.asc_price),
    re_path(r'^add_domain/', views.add_domain),
    re_path(r'^about_us/', views.about_us),
    re_path(r'^add_solution/', views.add_solution),
    re_path(r'^add_resource/', views.add_resource),
    re_path(r'^edit_profile/', views.edit_profile),
    re_path(r'^view_profile/(?P<userid>\d+)/$', views.view_profile),
    re_path(r'^change_pass/', views.change_pass),
    re_path(r'^free/', views.free),
    re_path(r'^paid/', views.paid),
    re_path(r'^complainid/', views.complainid),
    re_path(r'^add_complain/', views.add_complain),
    re_path(r'^resolve_complain/', views.resolve_complain),
    re_path(r'^domain_wise/(?P<domain>[\w\-]+)/$', views.domain_wise),
    re_path(r'^get_complaint/', views.get_complain),
]
