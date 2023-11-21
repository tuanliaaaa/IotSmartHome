from channels.consumer import SyncConsumer,AsyncConsumer
from channels.exceptions import StopConsumer
import asyncio
import httpx
async def getvalueBySensorName(sensorName):
    url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/"+sensorName

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            json_data = response.json()
            return json_data[0]
        else:
            return None

class TempratureConsummers(AsyncConsumer):
    async def websocket_connect(self,event):
        await self.send({
            'type':'websocket.accept',
        })
    async def websocket_receive(self,event):
        while True:
            temprature = await getvalueBySensorName('V11')
            await self.send({
                'type': 'websocket.send',
                'text':temprature,
            }) 
            await asyncio.sleep(10)    
    async def websocket_disconnect(self,event):
        print('ngừng kết nối')
        raise StopConsumer()
class HumiditiConsummers(AsyncConsumer):
    async def websocket_connect(self,event):
        await self.send({
            'type':'websocket.accept',
        })
    async def websocket_receive(self,event):
        while True:
            temprature = await getvalueBySensorName('V12')
            await self.send({
                'type': 'websocket.send',
                'text':temprature,
            }) 
            await asyncio.sleep(10)    
    async def websocket_disconnect(self,event):
        print('ngừng kết nối')
        raise StopConsumer()
