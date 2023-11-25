import os
from django.core.asgi import get_asgi_application
from django.core.wsgi import get_wsgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
import Api.routing
os.environ.setdefault('DJANGO_SETTING_MODULE','core.settings')
application=ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':URLRouter(
        Api.routing.websocket_urlparttens
    )
})