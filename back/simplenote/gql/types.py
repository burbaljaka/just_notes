from graphene_django import DjangoObjectType
from graphene import Field
from notes.models import Note, Theme


class ThemeType(DjangoObjectType):
    class Meta:
        model = Theme
        only_fields = ('id', 'name')


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        only_fields = (
            'id',
            'title',
            'body',
            'created_at',
            'theme'
        )
        use_connection = True
