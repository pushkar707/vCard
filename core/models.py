from django.db import models
from django.contrib.auth.hashers import check_password
from datetime import datetime

class User(models.Model):
        email = models.EmailField(unique=True)
        password = models.TextField()

        def check_password(self,password):
                return check_password(password,self.password)
        
        def __str__(self):
                return str("User's mail: "+self.email)

class Card(models.Model):
        name = models.CharField(max_length=120)
        html = models.TextField()
        date_created = models.DateTimeField(default=datetime.now())
        brandLogo = models.CharField(max_length=120,null=True)
        headshotImage = models.CharField(max_length=120,null=True)
        featuredContentMedia = models.TextField(null=True)
        prefix = models.CharField(max_length=10,null=True)
        fname = models.CharField(max_length=50,null=True)
        lname = models.CharField(max_length=50,null=True)
        job_title = models.CharField(max_length=150,null=True)
        business_name = models.CharField(max_length=200,null=True)
        business_description = models.TextField(null=True)
        business_address = models.TextField(null=True)
        phone = models.IntegerField(null=True)
        email = models.EmailField(null=True)
        website = models.CharField(max_length=200,null=True)
        linkedin = models.CharField(max_length=200,null=True)
        facebook = models.CharField(max_length=200,null=True)
        github = models.CharField(max_length=200,null=True)
        instagram = models.CharField(max_length=200,null=True)
        twitter = models.CharField(max_length=200,null=True)
        media_keys = models.TextField(null=True)
        user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
        views = models.IntegerField(default=0)

        def __str__(self):
                return str("Card Name: "+self.name)

