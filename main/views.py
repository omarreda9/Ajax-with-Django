from django.shortcuts import render
from django.http import JsonResponse

from .forms import PhotosForm


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def photos(request):
    form = PhotosForm(request.POST or None, request.FILES or None)
    data = {}

    if is_ajax(request=request):
        print(1)
        if form.is_valid():
            print(2)
            form.save()
            data['title'] = form.cleaned_data.get('title')
            data['status'] = 'ok'
            return JsonResponse(data)
    context = {
        'form': form,
    }
    return render(request, 'main.html', context)
