from django.urls import path
from Api.consummers import consummer
from Api.consummers import EquipmentConsummer
websocket_urlparttens=[
    path('ws/temprature/',consummer.TempratureConsummers.as_asgi()),
    path('ws/humiditi/',consummer.HumiditiConsummers.as_asgi()),
    path('ws/equipment/<int:id>',EquipmentConsummer.EquipmentGetAll.as_asgi()),
    path('ws/equipmentByID/<int:id>',EquipmentConsummer.EquipmentById.as_asgi())
]