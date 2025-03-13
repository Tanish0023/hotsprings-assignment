from rest_framework import serializers

class EventSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(default="N/A")
    localDate = serializers.CharField(default="N/A")
    localTime = serializers.CharField(default="N/A")
    image = serializers.URLField(default=None)
    genre = serializers.CharField(default="N/A")
    venue = serializers.CharField(default="N/A")
    url = serializers.URLField(default=None)

class EventDetailSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    localDate = serializers.CharField()
    localTime = serializers.CharField()
    artists = serializers.CharField()
    venue = serializers.CharField()
    genres = serializers.CharField()
    priceRange = serializers.CharField()
    ticketStatus = serializers.CharField()
    ticketUrl = serializers.URLField()
    seatMap = serializers.URLField(allow_null=True)