from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import User,Card
from django.contrib.auth.hashers import make_password
from django.contrib.auth import login 
from django.contrib import messages
from .s3_config import s3,s3_fetch,s3_upload,s3_download
from .vcard import make_vcard,write_vcard
import time
from django.contrib.sites.shortcuts import get_current_site


def checkLoggedIn(request):
    user = request.session.get('user')
    if not user:
        return False
    else:
        return True

def login(request):
    return render(request,'login.html',{})

def login_post(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = User.objects.get(email=email)
        if(user.check_password(password)):
            messages.success(request, "Logged In Successfully")
            request.session['user'] = user.id
        else:
            messages.error(request, "Invalid Login details")
            
        guest = request.session.get('guest')
        if(guest):
            card_id = request.session.get('card')
            card = Card.objects.get(id=card_id)
            card.user = user
            card.save()
            del request.session['guest']
            del request.session['card']
        
    except:
        messages.error(request, "Invalid Login details")
    return redirect("/dashboard")

def register(request):
    return render(request,'register.html',{})

def register_post(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    c_password = request.POST.get('c_password')
    if(password!= c_password):
        messages.error(request, "Passwords don't match")
        return redirect('/register')
    user,created = User.objects.get_or_create(email=email)
    if not created:
        messages.error(request, "Email Already in use")
        return redirect('/register')
    password = make_password(password)
    user.password = password
    user.save()
    return redirect('/login')

def logout(request):
    del request.session['user']
    return redirect('/login')

def dashboard(request):
    if not checkLoggedIn(request):
        return redirect('/login')
    id = request.session.get('user')
    user = User.objects.get(id=id)
    cards = user.card_set.all()
    domain = f"http://{get_current_site(request)}"
    
    return render(request,'dashboard.html',{'user':user,'cards':cards,'domain':domain})

def createCard(request):
    if(request.method=="GET"):
        user = request.session.get('user')
        return render(request,'create-page.html',{'user':user})
    elif(request.method=="POST"):
        name = request.POST.get('name',None)
        html = request.POST.get('html',None)
        prefix = request.POST.get('prefix',None)
        fname = request.POST.get('first-name',None)
        lname = request.POST.get('last-name',None)
        job_title = request.POST.get('job-title',None)
        business_name = request.POST.get('business-name',None)
        business_description = request.POST.get('business-description',None)
        business_address = request.POST.get('business-address',None)
        phone = request.POST.get('mobile-work',None) or None
        email = request.POST.get('email',None)
        website = request.POST.get('website',None)
        linkedin = request.POST.get('linkedin',None)
        facebook = request.POST.get('facebook',None)
        github = request.POST.get('github',None)
        instagram = request.POST.get('instagram',None)
        twitter = request.POST.get('twitter',None)

        # HANDLING MEDIA FILES
        media_keys = ""
        count = int(request.POST.get('media-count'))

        for i in range(1,count+1):
            media = request.FILES.get(f'media-{i}')
            if media:
                mediaKey = s3_upload(media,media.name)
                media_keys+=mediaKey+","

        logo = request.FILES.get("logo",None)        
        logo_key = s3_upload(logo,logo.name) if logo else None

        headshot = request.FILES.get('headshot',None)
        headshot_key = s3_upload(headshot,headshot.name) if headshot else None

        user_id = request.session.get('user')
        # user = User.objects.get(id=id)
        card = Card(name=name,html=html,brandLogo=logo_key,headshotImage=headshot_key,prefix=prefix,
                    fname=fname,
                    lname=lname,
                    job_title=job_title,
                    business_name=business_name,
                    business_description=business_description,
                    business_address=business_address,
                    phone=phone,
                    email=email,
                    website=website,
                    linkedin=linkedin,
                    facebook=facebook,
                    github=github,
                    instagram=instagram,
                    twitter=twitter,
                    media_keys=media_keys)
        card.save()
        if user_id:
            user = User.objects.get(id=user_id)
            card.user = user
            card.save()
        else:
            request.session['guest'] = True
            request.session['card'] = card.id
            messages.info(request,'Please login to proceed further')
            return redirect('/login')
        
        return redirect('/dashboard')
    
def show_card(request,id):
    card = Card.objects.get(id=id)
    domain = get_current_site(request)
    brandLogo = f"http://{domain}/image/{card.brandLogo}"
    headshot = f"http://{domain}/image/{card.headshotImage}"
    media_keys = card.media_keys[:-1].split(',')
    media = [f"http://{domain}/image/{key}" for key in media_keys]
    card.views+=1
    card.save()
    
    return render(request,"card.html",{"html":card.html,'brandLogo':brandLogo,"headshot":headshot,"media_urls":media,"card_id":card.id})

def delete_card(request,id):
    if not checkLoggedIn(request):
        return redirect('/login')
    Card.objects.get(id=id).delete()
    return redirect("/dashboard")

def edit_card(request,id):
    if not checkLoggedIn(request):
        return redirect('/login')
    if(request.method=="GET"):
        card = Card.objects.get(id=id)
        domain = get_current_site(request)
        brandLogo = f"http://{domain}/image/{card.brandLogo}"
        headshot = f"http://{domain}/image/{card.headshotImage}"
        media_keys = card.media_keys[:-1].split(',')
        media = [f"http://{domain}/image/{key}" for key in media_keys]    
        return render(request,"edit.html",{"html":card.html,'brandLogo':brandLogo,"headshot":headshot,"media_urls":media,"id":card.id,"name":card.name})
    elif(request.method=="POST"):
        card = Card.objects.get(id=id)

        # HANDLING MEDIA
        existing_media = card.media_keys[:-1].split(',')
        existing_media_count = len(existing_media)
        new_media_count = int(request.POST.get("media-count"))
        new_media = []
        for i in range(1,new_media_count+1):
            media = request.FILES.get(f'media-{i}')
            if media:
                mediaKey = s3_upload(media,media.name)
                new_media.append(mediaKey)
            elif(existing_media_count>=i):
                new_media.append(existing_media[i-1])
        card.media_keys = ",".join(new_media)+','

        # HEADSHOT AND LOGO
        new_headshot = request.FILES.get("headshot",None)
        if(new_headshot):
            headshot = s3_upload(new_headshot,new_headshot.name)
            card.headshotImage = headshot

        new_logo = request.FILES.get("logo",None)
        if(new_logo):
            logo = s3_upload(new_logo,new_logo.name)
            card.brandLogo = logo

        # HANDLING VCF
        basic_details = {"prefix":'prefix','fname':'first-name','lname':'last-name',"job_title":'job-title',"business_name":'business-name',"business_description":'business-description','business_address':'business-address'}
        card.prefix = request.POST.get('prefix',None)
        card.fname = request.POST.get('first-name',None)
        card.lname = request.POST.get('last-name',None)
        card.job_title = request.POST.get('job-title',None)
        card.business_name = request.POST.get('business-name',None)
        card.business_address = request.POST.get('business-address',None)
        card.business_description = request.POST.get('business-description',None)

        socials = ['mobile-work','email','website','linkedin','facebook','github','instagram','twitter']
        mobile = request.POST.get('mobile-work',None)
        if mobile:
            card.phone = mobile
        email = request.POST.get('email',None)
        if email:
            card.email = email
        website = request.POST.get('website',None)
        if website:
            card.website = website
        linkedin = request.POST.get('linkedin',None)
        if linkedin:
            card.linkedin = linkedin
        facebook = request.POST.get('facebook',None)
        if facebook:
            card.facebook = facebook
        github = request.POST.get('github',None)
        if github:
            card.github = github
        instagram = request.POST.get('instagram',None)
        if instagram:
            card.instagram = instagram
        twitter = request.POST.get('twitter',None)
        if twitter:
            card.twitter = twitter
        
        # HADLING HTML AND NAME
        html = request.POST.get("html")
        name = request.POST.get("name")
        card.html = html
        card.name = name
        card.save()

        return redirect(f"/card/{id}")
def generate_vcard(request,id):
    if not checkLoggedIn(request):
        return redirect('/login')
    card = Card.objects.get(id=id)
    name = card.name
    prefix = card.prefix
    first_name = card.fname
    last_name = card.lname
    job_title = card.job_title
    business_name = card.business_name
    business_description = card.business_description
    business_address = card.business_address
    phone = card.phone
    email = card.email
    website = card.website
    linkedin = card.linkedin
    facebook = card.facebook
    github = card.github
    instagram = card.instagram
    twitter = card.twitter
    s3image = card.headshotImage
    image_url = f"http://{get_current_site(request)}/image/{s3image}"
    vcard = make_vcard(image_url,prefix,first_name,last_name,job_title,business_name,business_description,phone,business_address,email,website,linkedin,facebook,github,instagram,twitter)
    vcf_file = 'contact.vcf'
    write_vcard(vcf_file, vcard)
    file_path = vcf_file
    with open(file_path, 'rb') as fh:
        response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
        response['Content-Disposition'] = 'inline; filename=' + f"{name or 'username'}.vcf"
        return response

def show_image(request,key):
    obj = s3_fetch(key)
    return HttpResponse(obj['Body'],content_type="image/jpeg")

def show_qr(request,id):
    domain = f"http://{get_current_site(request)}"
    return render(request,"qr.html",{"id":id,"domain":domain})

def test(request):
    print(request.session.get("user"))
    return HttpResponse("")