from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_api
from .ahihi import sahi

def start():
	scheduler = BackgroundScheduler()
	scheduler.add_job(schedule_api, 'interval', seconds=1)
	scheduler.add_job(sahi, 'interval', seconds=1)

	scheduler.start()