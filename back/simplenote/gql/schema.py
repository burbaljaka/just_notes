from graphene import Argument, Field, ID, ObjectType, Schema
from .filters import NoteFilter
from notes.models import Note
from .types import NoteType
from graphene_django.filter import DjangoFilterConnectionField
from .mutations import NoteDelete, NoteCreate, ThemeCreate, NoteUpdate


class Query(ObjectType):
    notes = DjangoFilterConnectionField(NoteType, filterset_class=NoteFilter)
    note = Field(NoteType, id=Argument(ID, required=True))

    def resolve_notes(self, info, **kwargs):
        return Note.objects.all()

    def resolve_note(self, info, **kwargs):
        return Note.objects.filter(pk=kwargs.get("id")).last()


class Mutation(ObjectType):
    note_create = NoteCreate.Field()
    note_update = NoteUpdate.Field()
    note_delete = NoteDelete.Field()
    theme_create = ThemeCreate.Field()


schema = Schema(query=Query, mutation=Mutation)
