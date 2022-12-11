from django.db import models


class Photos(models.Model):
    title = models.CharField(max_length=125)
    content = models.TextField()
    image = models.ImageField(upload_to='photos')
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
