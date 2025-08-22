# wsgi.py
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blogsphere.settings')

from django.conf import settings
settings.DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
