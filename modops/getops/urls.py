from django.urls import path
from .views import DownloadCSVView

urlpatterns = [
    path('download_csv/', DownloadCSVView.as_view(), name='download_csv'),
]