from django.contrib import admin
from django.urls import path, include

# Define project-level URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    # Routes /api/ to comments app
    path('api/', include('comments.urls')),
]