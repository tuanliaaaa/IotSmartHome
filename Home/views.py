from django.shortcuts import render
from django.views import View
import os
from django.http import HttpResponse
from core.settings import MEDIA_ROOT
class Login(View):
    def get(self,request):
        return render(request,'login.html')
class Room(View):
    def get(self,request):
        return render(request,'room.html')
class EquipmentByRoom(View):
    def get(self,request,roomID):
        return render(request,'Equipment.html')
class Alarm(View):
    def get(self,request,equimentID):
        return render(request,'Alarm.html')   
def image_view(request, image_name):

    image_dir = MEDIA_ROOT
    
    # Tạo đường dẫn tới tệp hình ảnh cần trả về
    image_path = os.path.join(image_dir,"Image", image_name)
    
    # Đọc nội dung của tệp hình ảnh
    with open(image_path, 'rb') as f:
        image_data = f.read()
    
    # Trả về nội dung của hình ảnh dưới dạng phản hồi HTTP
    response = HttpResponse(content_type='image/*')
    response.write(image_data)
    
    return response 

