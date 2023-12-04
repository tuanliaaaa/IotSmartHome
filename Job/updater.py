from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_api
import threading
import os
import csv
from core.settings import BASE_DIR
def start():
    file_path= os.path.join(BASE_DIR,"Job","oke.csv")
    with open(file_path, 'r', newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        rows = list(csv_reader)
        print(rows[0][0])
    if  rows[0][0] == '1':
        print('done')
        rows[0][0] = '0'
        ok= threading.Thread(target=schedule_api)
        ok.start()
        with open(file_path, 'w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerows(rows)

    else:
        rows[0][0] = '1'
        with open(file_path, 'w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerows(rows)


