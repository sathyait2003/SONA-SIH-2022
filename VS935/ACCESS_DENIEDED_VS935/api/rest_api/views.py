from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators import csrf
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import json
from django.db import connection
from rest_api.models import Domain
# Create your views here.


def index(request):
    obj={
        'Hackathon':'SIH-2022',
        'Team Name':'Access Denieded'
    }
    return JsonResponse(obj,safe=False)

def home(request):
    return HttpResponse("SIH-2022 App")


@csrf_exempt
def complaint_status(request,complain_id):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("select * from grievance where userid = %s ", [complain_id])
        r=cursor.fetchall()
        return JsonResponse(r[0],safe=False)


@csrf_exempt
def view_profile(request, userid):
    if(request.method == 'GET'):
        cursor = connection.cursor()
        cursor.execute("select * from public.user_info where userid = %s ", [userid])
        r = cursor.fetchall()
        return JsonResponse(r[0], safe=False)

@csrf_exempt
def complaint_status_code(request):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("select * from grievance_status")
        r=cursor.fetchall()
        return JsonResponse(r,safe=False)

@csrf_exempt
def domain_list(request):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("select * from domain")
        r=cursor.fetchall()
        domain={}
        print(r)
        return JsonResponse(r,safe=False)

@csrf_exempt
def sorted_rating(request):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("SELECT * FROM public.resources ORDER BY rating DESC;")
        r=cursor.fetchall()
        return JsonResponse(r,safe=False)

@csrf_exempt
def desc_price(request):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("SELECT * FROM public.resources ORDER BY price DESC;")
        r=cursor.fetchall()
        return JsonResponse(r,safe=False)

@csrf_exempt
def asc_price(request):
    if(request.method=='GET'):
        cursor  = connection.cursor()
        cursor.execute("SELECT * FROM public.resources ORDER BY price ASC;")
        r=cursor.fetchall()
        return JsonResponse(r,safe=False)


@csrf_exempt
def free(request):
    if(request.method == 'GET'):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM public.resources where price='0' ")
        r = cursor.fetchall()
        return JsonResponse(r, safe=False)


@csrf_exempt
def paid(request):
    if(request.method == 'GET'):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM public.resources where price!='0' ")
        r = cursor.fetchall()
        return JsonResponse(r, safe=False)


@csrf_exempt
def domain_wise(request,domain):
    if(request.method == 'GET'):
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM public.resources where domain_code=%s ",[domain])
        r = cursor.fetchall()
        return JsonResponse(r, safe=False)


@csrf_exempt
def complainid(request):
    if(request.method == 'GET'):
        cursor = connection.cursor()
        cursor.execute("select userid from public.grievance")
        r = cursor.fetchall()
        return JsonResponse(r, safe=False)




@csrf_exempt
def add_domain(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        domain = body['domain']
        cursor = connection.cursor()
        cursor.execute("insert into domain (domain) values (%s)", [domain])
        obj = {
            "Domain":domain,
            "message": "Domain Added Successfully",
            "status":"True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")

@csrf_exempt
def change_pass(request):
    if(request.method == 'POST'):
        obj = {

            "message": "Password Changed Successfully",
            "status":"True"
            }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")

@csrf_exempt
def about_us(request):
    if(request.method == 'GET'):
        obj = {
            "Description": "WHO ARE WE? SHIKSHA VARDHAN is an education platform for all students around the globe. Education is important for all. In our life, all of us don't get the opportunity to grab that and make our success path brighter. Sometimes we get the opportunity but could not use all of it. so, here we are launching a portal for all of the students around the globe to fulfill their learning process more better. ABOUT OUR PLATFORM! From our portal industries can share their best courses with other industries, and other industries can buy that courses and avail them free for their students. If any student wants to access any particular resource that student can buy the course from our portal. it will be paid so that educational industries that are sharing the courses can make some profit.",
            "version": "1.0",
            "contributors": "Access Denieded"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")

@csrf_exempt
def add_resource(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        resource_name = body['resource_name']
        college = body['college']
        rating = body['rating']
        domain_code = body['domain_code']
        price=body['price']
        unique_id=body['unique_id']
        department= body['department']
        cursor = connection.cursor()
        cursor.execute(
            "insert into resources (resource_name,college,rating,domain_code,price,unique_id,department) values (%s,%s,%s,%s,%s,%s,%s)", [resource_name, college, rating, domain_code, price, unique_id, department])
        obj = {
            "message": "Resource Added Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")

@csrf_exempt
def add_complain(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        date = body['date']
        complaint = body['complaint']
        userid = body['userid']
        status = body['status'];
        cursor = connection.cursor()
        cursor.execute(
            "insert into public.grievance (date,complaint,userid,status) values (%s,%s,%s,%s)", [date, complaint, userid, status])
        obj = {
            "message": "Complaint Added Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")

@csrf_exempt
def add_solution(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        solution = body['solution']
        userid = body['userid']
        cursor = connection.cursor()
        cursor.execute("UPDATE public.grievance SET solution=%s WHERE userid=%s", [solution,userid])
        obj = {
            "message": "Solution Added Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")


@csrf_exempt
def add_solution(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        solution = body['solution']
        userid = body['userid']
        cursor = connection.cursor()
        cursor.execute("UPDATE public.grievance SET solution=%s WHERE userid=%s", [
                       solution, userid])
        obj = {
            "message": "Solution Added Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")


@csrf_exempt
def edit_profile(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        userid = body['userid']
        college_name=body['college_name']
        gender=body['gender']
        email=body['email']
        name=body['name']
        mobile_no=body['mobile_no']
        #college_id=body['college_id']
        cursor = connection.cursor()
        cursor.execute("UPDATE public.user_info SET college_name=%s,gender=%s,email=%s,mobile_no=%s,name=%s WHERE userid=%s", [
                       college_name, gender, email, mobile_no,name,userid])
        obj = {
            "message": "Profile edited Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("editing Failed!")


@csrf_exempt
def resolve_complain(request):
    if(request.method == 'POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        userid = body['userid']
        solution = body['solution']
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE public.grievance SET solution=%s, status='2' WHERE userid=%s", [solution, userid])
        obj = {
            "message": "Complaint Added Successfully",
            "status": "True"
        }
        return JsonResponse(obj, safe=False)
    return HttpResponse("Adding Failed!")



@csrf_exempt
def get_complain(request):
    if(request.method=='POST'):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        userid = body['userid']
        cursor  = connection.cursor()
        cursor.execute("select * from public.grievance where userid=%s",[userid])
        r=cursor.fetchall()
        return JsonResponse(r,safe=False)

