# myapp/views.py
from rest_framework.views import APIView
import csv
from django.http import HttpResponse
from Entity.models.EquipmentAdmin import EquipmentAdmin
from Entity.models.RoomAdmin import RoomAdmin
from django.db import connection
import os
from core.settings import MEDIA_ROOT
class CSV(APIView):
    def get(self, request):
        # Lấy tất cả Equipment từ CSDL
        equipmentAdmin_list = EquipmentAdmin.objects.all()
        roomAdmin_list= RoomAdmin.objects.all()
        # Đường dẫn đến file CSV
        
        csv_file_path =os.path.join( MEDIA_ROOT,'Csv','output.csv')

        # Mở file CSV để ghi
        with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
            # Tạo đối tượng csv.writer cho file CSV
            csv_writer = csv.writer(csvfile)

            # Ghi header vào CSV
            csv_writer.writerow(['EquipmentName', 'Nhãn'])
            index = 0
            
            # Ghi dữ liệu từ CSDL vào CSV
            for equipment in equipmentAdmin_list:
                for room in roomAdmin_list:
                    if equipment.EquipmentAdminType == 1:
                        inputOn = "Mở " + equipment.EquipmentAdminName+' '+room.RoomAdminName 
                        inputOff = "Tắt " + equipment.EquipmentAdminName+' '+room.RoomAdminName 
                        csv_writer.writerow([inputOn, index])
                        csv_writer.writerow([inputOff, index+1])
                        index += 2
                    if equipment.EquipmentAdminType == 2:
                        inputLv0 = "Tắt " + equipment.EquipmentAdminName+' '+room.RoomAdminName 
                        inputLv1 = "Mở " + equipment.EquipmentAdminName+' '+room.RoomAdminName  
                        inputLv2 = "Dừng " + equipment.EquipmentAdminName+' '+room.RoomAdminName  


                        csv_writer.writerow([inputLv0, index])
                        csv_writer.writerow([inputLv1, index+1])
                        csv_writer.writerow([inputLv2, index+2])
                        index += 3


        # Trả về một HttpResponse để thông báo về việc ghi file thành công
        return HttpResponse("File CSV đã được tạo thành công và lưu tại: {}".format(csv_file_path))