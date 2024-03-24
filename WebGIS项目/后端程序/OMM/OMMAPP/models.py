from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models as GeoModels
class MentalInformation(GeoModels.Model):
    station_code=GeoModels.CharField(max_length=15,verbose_name="站点")
    location=GeoModels.PointField()
    longlatitude=GeoModels.CharField(max_length=30,verbose_name="经纬度")
    water_depth=GeoModels.FloatField(null=True,verbose_name="水深")
    mn=GeoModels.FloatField(null=True,verbose_name="锰")
    fe=GeoModels.FloatField(null=True,verbose_name="铁")
    co=GeoModels.FloatField(null=True,verbose_name="钴")
    ni=GeoModels.FloatField(null=True,verbose_name="镍")
    cu=GeoModels.FloatField(null=True,verbose_name="铜")
    zn=GeoModels.FloatField(null=True,verbose_name="锌")
    pb=GeoModels.FloatField(null=True,verbose_name="铅")
    al=GeoModels.FloatField(null=True,verbose_name="铝")
    si=GeoModels.FloatField(null=True,verbose_name="硅")

class User(AbstractUser):
    #定义用户模型，继承自Auth应用的AbstractUser
    name = models.CharField(max_length=30, null=True, blank=True, verbose_name="姓名")
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(max_length=6, choices=(("male", u"男"), ("female", "女")), default="female", verbose_name="性别")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话")
    email = models.CharField(max_length=100, null=True, blank=True, verbose_name="邮箱")
    class Meta:
        verbose_name = "用户"
        verbose_name_plural = "用户"
    def __str__(self):
        return self.username
# Create your models here.
