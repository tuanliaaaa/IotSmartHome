from django.conf import settings
import requests
import json
import random
from Entity.models import Clock,Equipment
from django.utils import timezone
import requests
import time
def schedule_api():
	while True:
		try:
			current_time = timezone.now()
			clockList=Clock.Clock.objects.filter(TimeAction__lte=current_time)
			for clock in clockList:
				equipment = Equipment.Equipment.objects.filter(clocks=clock)[0]
				equipment.StatusActive= clock.StatusActive
				equipment.save()
				url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/update/"+equipment.EquipmentKey+"?value="+clock.StatusActive+"&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
				response = requests.get(url)
				if response.status_code == 200:
					clock.delete()
		except:
			print("lỗi")

	

