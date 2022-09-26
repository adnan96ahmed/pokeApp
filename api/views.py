from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pokemon
from .serializers import PokemonSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/pokemon/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of pokemon'
        },
        {
            'Endpoint': '/pokemon/add/',
            'method': 'POST',
            'body': {'name': "",
                     'image_url': "",
                     'types': []},
            'description': 'Adds a new pokemon with data sent in post request'
        },
    ]

    return Response(routes)

@api_view(['GET', 'POST'])
def getPokemon(request):
    if request.method == 'GET':
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data
        pokemon = Pokemon.objects.create(
            name=data['name'],
            image_url=data['image_url'],
            types=data['types']
        )
        serializer = PokemonSerializer(pokemon, many=False)
        return Response(serializer.data)
        