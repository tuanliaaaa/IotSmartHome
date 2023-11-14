from django.db import models
from .User import User
class Home(models.Model):
    HomeName = models.CharField(max_length=225)
    User = models.ForeignKey(User, on_delete=models.CASCADE,related_name='homes')