from django.urls import path
from . import views

# Defines URL patterns for comments app
# Specifies which view handles each endpoint
urlpatterns = [
    path('comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', views.CommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
]