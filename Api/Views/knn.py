from datetime import datetime
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

class KNN(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('SELECT smarthome.entity_history.statusactive, smarthome.entity_history.equipment_id, smarthome.entity_history.statusroom, smarthome.entity_history.time FROM smarthome.entity_history;')
            rows = cursor.fetchall()
            p1 = []
            p2 = [] 
            p3 = [] 
            status = []
            idEquipment = []
            day = []
            hour = []
            minute =[] 
            stt = []
            
            for i in range(len(rows)):
                day.append(rows[i][3].date().day)
                hour.append(rows[i][3].hour)
                minute.append(rows[i][3].minute)
                stt.append(rows[i][3].weekday() + 2)
                idEquipment.append(rows[i][1])
                status.append(rows[i][0])
                p1.append(int(rows[i][2][0]))
                p2.append(int(rows[i][2][1]))
                p3.append(int(rows[i][2][2]))

        # Chia dữ liệu thành tập huấn luyện và tập kiểm thử
        X_train, X_test, y_train, y_test = train_test_split(np.array([p1,p2,p3,hour, minute, stt]).T, np.array([idEquipment, status]).T, test_size=0.2, random_state=42)
        # Xây dựng mô hình KNN
        knn_model = KNeighborsClassifier(n_neighbors=7)
        knn_model.fit(X_train, y_train)
        print("done trains")

        # # Dự đoán trên tập kiểm thử
        # y_pred = knn_model.predict(X_test)

        # # Đánh giá độ chính xác của mô hình
        # accuracy = accuracy_score(y_test, y_pred)
        # print(f"Accuracy: {accuracy}")

        # Dự đoán hành động cho dữ liệu mới
        newday = datetime.now().date().day
        newminute = datetime.now().minute
        newhour = datetime.now().hour
        newstt = datetime.now().weekday() + 2
        
        new_data = np.array([[1,1,0,newhour, newminute, newstt]])
        print("done data test")
        predicted_action = knn_model.predict(new_data)
        
        return Response({"nhan": predicted_action.tolist()}, status=200)