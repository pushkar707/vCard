def user_processor(request):           
    user = request.session.get('user')
    return {'user':user}