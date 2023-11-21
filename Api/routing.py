from django.urls import path
from Api.consummers import consummer
websocket_urlparttens=[
    path('ws/temprature/',consummer.TempratureConsummers.as_asgi()),
    path('ws/humiditi/',consummer.HumiditiConsummers.as_asgi())
]