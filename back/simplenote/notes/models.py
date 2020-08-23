from django.db import models


class Theme(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Note(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    theme = models.ForeignKey(Theme, related_name='notes', on_delete=models.CASCADE, null=True, blank=True)


    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return '{} (#{})'.format(self.title, self.pk)



