from django.conf import settings
import requests
import json
import random
from Entity.models.Clock import Clock
from Entity.models.Equipment import Equipment
from Entity.models.User import User
from Entity.models.Home import Home
from Entity.models.History import History
from Entity.models.Mode import Mode
from django.utils import timezone
import requests
import time
from datetime import datetime
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

def schedule_api():
	while True:
		try:
			current_time = timezone.now()
			clockList=Clock.objects.filter(TimeAction__lte=current_time)
			for clock in clockList:
				equipment = Equipment.objects.filter(clocks=clock)[0]
				equipment.StatusActive= clock.StatusActive
				equipment.save()
				url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/update/"+equipment.EquipmentKey+"?value="+clock.StatusActive+"&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
				response = requests.get(url)
				if response.status_code == 200:
					print("delete thành conng")
					clock.delete()
		except:
			print("lỗi")

	

def Knn():
	while True:
		try:
			homeList = Home.objects.filter(modes__StatusMode=1) 
			if len(homeList):
				historyList = History.objects.all()
				p1 = []
				p2 = [] 
				p3 = [] 
				p4 = []
				p5 = []
				p6 = []
				status = []
				idEquipment = []
				day = []
				hour = []
				minute =[] 
				stt = []
				
				for history in historyList:
					day.append(history.Time.date().day)
					hour.append(history.Time.hour)
					minute.append(history.Time.minute)
					stt.append(history.Time.weekday() + 2)
					idEquipment.append(history.Equipment.pk)
					status.append(history.StatusActive)
					p1.append(int(history.StatusRoom[0]))
					p2.append(int(history.StatusRoom[1]))
					p3.append(int(history.StatusRoom[2]))
					# Chia dữ liệu thành tập huấn luyện và tập kiểm thử
				X_train, X_test, y_train, y_test = train_test_split(np.array([p1,p2,p3,day,hour, minute, stt,idEquipment]).T, np.array([status]).T, test_size=0.1, random_state=42)
				# Xây dựng mô hình KNN
				knn_model = KNeighborsClassifier(n_neighbors=7)
				knn_model.fit(X_train, y_train)
				print("done trains")
				# Dự đoán hành động cho dữ liệu mới
				newday = datetime.now().date().day
				newminute = datetime.now().minute
				newhour = datetime.now().hour
				newstt = datetime.now().weekday() + 2
				statusp1=0
				statusp2=0
				statusp3=0
				url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V15"
				response = requests.get(url)
				if response.status_code == 200:
					statusp1=response.json()[0]
				url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V16"
				response = requests.get(url)
				if response.status_code == 200:
					statusp2=response.json()[0]
				url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/V17"
				response = requests.get(url)
				if response.status_code == 200:
					statusp3=response.json()[0]
				for home in homeList:
					equipmentList = Equipment.objects.filter(Room__Home=home)
					for equipment in equipmentList:
						new_data = np.array([[int(statusp1),int(statusp2),int(statusp3),newday,newhour, newminute, newstt,equipment.id]])
						print("done data test")
						predicted_action = knn_model.predict(new_data)
						print(f"Thiết bị {equipment.id} : {predicted_action[0]}")
						equipment.StatusActive = predicted_action[0]
						equipment.save()

						url1 = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/update/"+equipment.EquipmentKey+"?value="+predicted_action[0]+"&fbclid=IwAR1swiQo5wywsl5hFCw1eIZRc9MkCtlVY0BZ7RgiozCZtp9Pe5Rn_BPtIlk"
						response = requests.get(url1)
		except:
			print("lỗi")
			