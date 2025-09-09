from rest_framework import serializers
from .models import Comment

# Handles conversion of Comment model instance to and from JSON
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'date', 'likes', 'image_url']
        read_only_fields = ['id', 'date']
    
    # Override default create method ensuring all created comments are Admins
    def create(self, validated_data):
        validated_data['author'] = 'Admin'
        return super().create(validated_data)