from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np

class Recommend(APIView):
    def get(self, request):
        userID = request.headers['userID']
        
        with connection.cursor() as cursor:
            cursor.execute('SELECT iot2.entity_history.Temprature, iot2.entity_history.Humidity, iot2.entity_history.StatusActive FROM iot2.entity_history WHERE iot2.entity_history.User_id = 1 AND iot2.entity_history.Temprature IS NOT NULL')
            rows = cursor.fetchall()
            
            a = []
            b = []

            for i in range(len(rows)):
                a.append(float(rows[i][2]))
                b.append([rows[i][0], rows[i][1]])

            print(a)
            print(b)

        a = np.array(a)
        b = np.array(b)
        print(a)
        def euclidean_distance(x1, x2):
            return np.sqrt(np.sum((x1 - x2)**2))

        def k_nearest_neighbors(b, a, x_new, k=7):
            if len(b) == 0 or len(a) == 0:
                return  # Handle empty arrays

            distances = []

            # Tính khoảng cách từ x_new đến mỗi điểm trong tập huấn luyện
            for i in range(len(b)):
                distance = euclidean_distance(x_new, b[i])
                distances.append((i, distance))

            # Sắp xếp theo khoảng cách tăng dần
            distances = sorted(distances, key=lambda x: x[1])

            # Chọn K láng giềng gần nhất
            neighbors_indices = [item[0] for item in distances[:min(k, len(distances))]]

            # Lấy giá trị của những láng giềng gần nhất
            neighbors_values = [a[idx] for idx in neighbors_indices]

            # Trả về giá trị trung bình của K láng giềng
            return np.mean(neighbors_values)

        # Dữ liệu mới cần dự đoán
        x_new = np.array([28, 38])

        # Dự đoán tốc độ quạt
        predicted_fan_speed = k_nearest_neighbors(b, a, x_new, k=7)

        print(f'Predicted Fan Speed: {predicted_fan_speed}')
        return Response({"nhan":predicted_fan_speed}, status=200)
