from rest_framework import generics
from .models import Comment
from .serializers import CommentSerializer

# Define API endpoint logic handling GET and POST requests
class CommentListCreateView(generics.ListCreateAPIView):
    # Define data source for view
    queryset = Comment.objects.all()
    # Specifies CommentSerializer to convert objects to and from JSON
    serializer_class = CommentSerializer

# Define API endpoint logic handling GET, PUT, and DELETE requests
class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # Define data source for view 
    # Filtered by ID in the URL 
    queryset = Comment.objects.all()
    # Specified CommentSerializer to serialize content or validate updates
    serializer_class = CommentSerializer