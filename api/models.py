from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Pokemon(models.Model):
    name = models.TextField(null=True, blank=True)
    types = ArrayField(models.CharField(max_length=50), blank=True, null=True)
    image_url = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

