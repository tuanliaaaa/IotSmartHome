from channels.consumer import AsyncConsumer
from channels.exceptions import StopConsumer
import asyncio
import httpx
from Serializer.EquipmentSerializer import EquipmentSerializer
from Entity.models.Equipment import Equipment
from channels.db import database_sync_to_async
import json

async def getvalueByEquipmentName(equipmentName):
    url = "http://68.183.236.192/GfqELsw7xlzsGe3hAXnadjsVPxsEiXKe/get/" + equipmentName

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            json_data = response.json()
            return json_data[0]
        else:
            return None
class EquipmentById(AsyncConsumer):
    async def websocket_connect(self, event):
        await self.send({
            'type': 'websocket.accept',
        })

    async def websocket_receive(self, event):
        id = self.scope['url_route']['kwargs']['id']
        while True:
            equipment = await self.get_equipment(id)
            e = await getvalueByEquipmentName(equipment.EquipmentKey)
            equipment.StatusActive = e
            await database_sync_to_async(lambda: equipment.save())()

            serialized_equipment = {
                'id': equipment.pk,
                'EquipmentName': equipment.EquipmentName,
                'EquipmentType': equipment.EquipmentType,
                'StatusActive': equipment.StatusActive,
            } 

            await self.send({
                'type': 'websocket.send',
                'text': json.dumps(serialized_equipment),
            })

            await asyncio.sleep(1)

    async def websocket_disconnect(self, event):
        print('Ngừng kết nối')
        raise StopConsumer()

    @database_sync_to_async
    def get_equipment(self, id):
        equipment_list = Equipment.objects.get(pk=id)
        return equipment_list


class EquipmentGetAll(AsyncConsumer):
    async def websocket_connect(self, event):
        await self.send({
            'type': 'websocket.accept',
        })

    async def websocket_receive(self, event):
        id = self.scope['url_route']['kwargs']['id']
        while True:
            equipmentList = await self.get_equipment_list(id)
            for equipment in equipmentList:
                e = await getvalueByEquipmentName(equipment.EquipmentKey)
                equipment.StatusActive = e
                await database_sync_to_async(lambda: equipment.save())()

            serialized_equipment_list = [{
                'id': equipment.pk,
                'EquipmentName': equipment.EquipmentName,
                'EquipmentType': equipment.EquipmentType,
                'StatusActive': equipment.StatusActive,
            } for equipment in equipmentList]

            await self.send({
                'type': 'websocket.send',
                'text': json.dumps(serialized_equipment_list),
            })

            await asyncio.sleep(5)

    async def websocket_disconnect(self, event):
        print('Ngừng kết nối')
        raise StopConsumer()

    @database_sync_to_async
    def get_equipment_list(self, id):
        equipment_list = Equipment.objects.filter(Room__pk=id)
        return list(equipment_list)
