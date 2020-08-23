from graphene import Boolean, Field, ID, InputObjectType, Mutation, String, Int
from rest_framework import serializers
from notes.models import Note, Theme
from .types import NoteType, ThemeType


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'body', 'theme']


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = '__all__'


class NoteCreate(Mutation):
    class Arguments:
        title = String()
        body = String()
        theme = Int()

    note = Field(NoteType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = NoteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return NoteCreate(serializer.save())


class NoteUpdate(Mutation):
    class Arguments:
        id = ID(required=True)
        title = String()
        body = String()
        theme = ID(required=False)

    note = Field(NoteType)

    @classmethod
    def mutate(cls, root, info, **data):
        obj = Note.objects.get(pk=data.pop('id'))
        serializer = NoteSerializer(data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.update(obj, serializer.validated_data)
        return NoteCreate(obj)



class NoteDelete(Mutation):
    class Arguments:
        id = ID(required=True)

    ok = Boolean()

    @classmethod
    def mutate(cls, root, info, **data):
        note = Note.objects.filter(id=data.get('id')).last()
        note.delete()
        return NoteDelete(ok=True)


class ThemeCreate(Mutation):
    class Arguments:
        name = String()

    theme = Field(ThemeType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = ThemeSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return ThemeCreate(serializer.save())
