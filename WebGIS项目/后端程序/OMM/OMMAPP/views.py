from telnetlib import AUTHENTICATION
from django.shortcuts import render
from OMMAPP.models import MentalInformation,User
from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.gis.geos import Point
import json
from django.contrib.auth import authenticate
from django.db import connection
from django.db.models import Q
from rest_framework import permissions
class getMetalInformation(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        #返回全部金属信息
        print(request.user)
        MI=MentalInformation.objects.all()
        data={}
        list=[]
        for row in MI:
            list.append(model_to_dict(row,exclude='location'))
        data["message"]="加载数据成功"
        data["data"]=list
        return Response(data)
def App(request):
    #返回网页主应用
    return render(request,'index.html')
def AddMetalRow(request):
    #添加数据功能
    
    ResData={}
    try:
        data = json.loads(request.body.decode())
        Stationcode=data['stationcode']
        StationLatitude=float(data['stationlatitude'])
        StationLongtitude=float(data['stationlongtitude'])
        WaterDepth=data['waterdepth']
        Mn=data['mn']
        Fe=data['fe']
        Co=data['co']
        Ni=data['ni']
        Cu=data['cu']
        Zn=data['zn']
        Pb=data['pb']
        Al=data['al']
        Si=data['si']
        TextLocation="Point({0} {1})".format(StationLongtitude,StationLatitude)
        point=Point(StationLongtitude,StationLatitude,srid=4326)
        MentalInformation.objects.create(station_code=Stationcode,location=point,water_depth=WaterDepth,mn=Mn,fe=Fe,co=Co,ni=Ni,cu=Cu,zn=Zn,pb=Pb,al=Al,si=Si,longlatitude=TextLocation)
    except:
        ResData['code']=0
        ResData['message']="添加失败,请检查数据"
    else:
        ResData['code']=1
        ResData['message']="添加成功"
    return JsonResponse(ResData,safe=False)
def DeleteMetalRow(request):
    #删除数据功能
    ResData={}
    try:
        data = json.loads(request.body.decode())
        reqID=data['id']
        MentalInformation.objects.get(id=reqID).delete()
    except:
        ResData['code']=0
        ResData['message']="删除失败,请检查该记录id是否存在"
    else:
        ResData['code']=1
        ResData['message']="删除成功"
    return JsonResponse(ResData,safe=False)
def QueryMetal(request):
    #查询数据功能
    
    ResData={}
    data = json.loads(request.body.decode())
    querykind=data['code']
    if querykind=='0':
        #根据查询类型来选择返回的数据，0为按站点查询，1为按经纬度查询，2为按金属类型查询
        sc=str(data['input1'])
        try:
            result=QueryByStationcode(sc)
            print(result)
        except:
            ResData['code']=0
            ResData['message']="查询失败,该站点号不存在"
            return JsonResponse(ResData,safe=False)
        if result==[]:
            ResData['code']=0
            ResData['message']="查询失败,该站点号不存在"
            return JsonResponse(ResData,safe=False)
        else:
            ResData['code']=1
            ResData['message']="查询成功"
            ResData['data']=result
            return JsonResponse(ResData,safe=False)
    elif querykind=='1':
        longtitude=data['input1']
        latitude=data['input2']
        sql='''
        SELECT id, station_code, water_depth, mn, fe, co, ni, cu, zn, pb, al, si, longlatitude
FROM public."OMMAPP_mentalinformation" as t where ST_INTERSECTS(ST_Buffer(ST_MakePoint({0},{1})::geography, 500000, 'quad_segs=2'),t.location)=true
        '''.format(longtitude,latitude)
        result=MentalInformation.objects.raw(sql)
        data={}
        list=[]
        for row in result:
            list.append(model_to_dict(row,exclude='location'))
        if list==[]:
            ResData['code']=2
            ResData["message"]="查询成功,该点附近无站点"
        else:
            ResData['code']=1
            ResData["message"]="查询成功"
            ResData["data"]=list
        return JsonResponse(ResData,safe=False)
    elif querykind=='2':
        odb=data['orderby']
        MI=orderbymetal(odb)
        data={}
        list=[]
        for row in MI:
            list.append(model_to_dict(row,exclude='location'))
        ResData['code']=1
        ResData["message"]="查询成功"
        ResData["data"]=list
        return JsonResponse(ResData,safe=False)
def QueryByStationcode(SC):
    ResData={}
    QueryResult=MentalInformation.objects.filter(station_code=SC)
    list=[]
    for row in QueryResult:
        list.append(model_to_dict(row,exclude='location'))
    return list
def orderbymetal(metal):
    if metal=='mn':
            MI=MentalInformation.objects.filter(mn__isnull=False).order_by('-mn')
    if metal=='fe':
            MI=MentalInformation.objects.filter(fe__isnull=False).order_by('-fe')
    if metal=='co':
            MI=MentalInformation.objects.filter(co__isnull=False).order_by('-co')
    if metal=='ni':
            MI=MentalInformation.objects.filter(ni__isnull=False).order_by('-ni')
    if metal=='cu':
            MI=MentalInformation.objects.filter(cu__isnull=False).order_by('-cu')
    if metal=='zn':
            MI=MentalInformation.objects.filter(zn__isnull=False).order_by('-zn')
    if metal=='pb':
            MI=MentalInformation.objects.filter(pb__isnull=False).order_by('-pb')
    if metal=='si':
            MI=MentalInformation.objects.filter(si__isnull=False).order_by('-si')
    return MI
def GetZoneMetal(request):

    #返回某一区域内站点金属总量
    ResData={}
    data = json.loads(request.body.decode())
    longtitude=data['input1']
    latitude=data['input2']
    sql='''
    SELECT sum(mn),sum(fe),sum(co),sum(ni),sum(cu),sum(zn),sum(pb),sum(si)
FROM public."OMMAPP_mentalinformation" as t where ST_INTERSECTS(ST_Buffer(ST_MakePoint({0},{1})::geography, 500000, 'quad_segs=2'),t.location)=true
        '''.format(longtitude,latitude)
    cursor = connection.cursor()
    try:
        cursor.execute(sql)
        result=cursor.fetchone()
    except:
        ResData['code']=0
        ResData["message"]="查询失败,请检查输入的经纬度是否正确"
    else:
        if result==(None, None, None, None, None, None, None, None):
            ResData['code']=2
            ResData["message"]="查询成功,该点附近无站点"
        else:
            sumMetal=[]
            for i in result:
                sumMetal.append(i)
            ResData['code']=1
            ResData["message"]="查询成功"
            ResData["data"]=sumMetal
    return JsonResponse(ResData,safe=False)
class updateUserInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def put(self, request):
        data = json.loads(request.body.decode())
        username=request.user
        resData={}
        user = User.objects.get(username=username)
        try:
            usernickname=data['usernickname']
            email=data['email']
            if usernickname!='':
                user.name=usernickname
            if email!='':
                user.email=email
            user.save()
        except:
            resData["message"]="更新失败"
            resData["code"]=0
        else:
            print(user.email)
            resData["message"]="更新成功"
            resData["code"]=1
        return Response(resData)
class changePassword(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def put(self, request):
        data = json.loads(request.body.decode())
        username=request.user
        oldPassword=data['oldPassword']
        resData={}
        user=authenticate(username=username,password=oldPassword)
        if user==None:
            resData["message"]="修改失败，原密码不正确"
            resData["code"]=0
            return Response(resData)
        newPassword=data['newPassword']
        alterPassword=data['alterPassword']
        if newPassword!=alterPassword:
            resData["message"]="修改失败，两次输入的密码不一致"
            resData["code"]=0
            return Response(resData)
        try:
            user.set_password(newPassword)
            user.save()
        except:
            resData["message"]="修改失败"
            resData["code"]=0
        else:
            resData["message"]="修改成功"
            resData["code"]=1
        return Response(resData)
#     return 
def GetOceanMetal(request):
    #返回某一海洋内站点金属总量
    ResData={}
    data = json.loads(request.body.decode())
    ocean=data['ocean']
    print(ocean)
    sql='''
    SELECT sum(mn),sum(fe),sum(co),sum(ni),sum(cu),sum(zn),sum(pb),sum(si)
FROM public."OMMAPP_mentalinformation" as t where area='{0}'
        '''.format(ocean)
    cursor = connection.cursor()
    try:
        cursor.execute(sql)
        result=cursor.fetchone()
        print(result)
    except:
        ResData['code']=0
        ResData["message"]="查询失败"
    else:
        if result==(None, None, None, None, None, None, None, None):
            ResData['code']=2
            ResData["message"]="查询成功,该海洋内无站点"
        else:
            sumMetal=[]
            for i in result:
                sumMetal.append(i)
            ResData['code']=1
            ResData["message"]="查询成功"
            ResData["data"]=sumMetal
    return JsonResponse(ResData,safe=False)
# Create your views here.
