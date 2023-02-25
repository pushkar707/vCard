"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from core.views import login,register,register_post,login_post,dashboard,createCard,show_card,logout,generate_vcard,show_image,test,edit_card

urlpatterns = [
    path('login/', login),
    path('login_post', login_post),
    path('register/', register),
    path('register_post', register_post),
    path('dashboard/', dashboard),
    path("",createCard),
    # path("card/share/",generate_vcard),
    path("card/share/<id>/",generate_vcard),
    path("card/<id>/",show_card),
    path("card/<id>/edit/",edit_card),
    path("logout/",logout),
    path('image/<key>/',show_image),
    path("test", test),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
