from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from login import settings

# Create your views here.
def home(request):
    return render(request, "authentication/index.html")

def signup(request):

    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username = username):
            messages.error(request, "username already taken, try another")
            return redirect('home')
        
        if User.objects.filter(email=email):
            messages.error(request, "Email already has an account")
            return redirect('home')
        
        if pass1 != pass2:
            messages.error(request, "passwords are not a match")

        

        myUser = User.objects.create_user(username, email, pass1)
        myUser.first_name = fname
        myUser.last_name = lname
        myUser.save()

        messages.success(request, "Account created successfully")

        return redirect('signin')

    return render(request, "authentication/signup.html")

def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username = username, password = pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "authentication/index.html", {"fname": fname})

        else:
            messages.error(request, "Invalid Login")
            return redirect("home")

    return render(request, "authentication/signin.html")

def signout(request):
    logout(request)
    messages.success(request, "You logged out")
    return redirect('home')