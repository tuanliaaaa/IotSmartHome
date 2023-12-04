from django.conf import settings
import requests
import json
import random
from Entity.models import Clock
from django.utils import timezone


def schedule_api():
    pass
	# current_time = timezone.now()
	# clockList=Clock.Clock.objects.filter(TimeAction__lte=current_time)
	# for clock in clockList:
		
	# 	clock.delete()
	

