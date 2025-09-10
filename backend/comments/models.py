from django.db import models
from django.utils import timezone

# Defines Model for Comment Schema
class Comment(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100, default='Admin')
    date = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)
    image_url = models.URLField(blank=True, null=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.author}: {self.text[:50]}..."