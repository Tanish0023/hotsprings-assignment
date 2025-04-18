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
    name = serializers.CharField(default="N/A")
    localDate = serializers.CharField(default="N/A")
    localTime = serializers.CharField(default="N/A")
    artists = serializers.CharField(default="N/A")
    venue = serializers.CharField(default="N/A")
    genres = serializers.CharField(default="N/A")
    priceRange = serializers.CharField(default="N/A")
    ticketStatus = serializers.CharField(default="N/A")
    ticketUrl = serializers.URLField(default=None)
    seatMap = serializers.URLField(allow_null=True)
    venueName = serializers.CharField(default="N/A")
    address = serializers.CharField(default="N/A")
    longitude = serializers.CharField(default="N/A")
    latitude = serializers.CharField(default="N/A")
    city = serializers.CharField(default="N/A")
    phoneNumber = serializers.CharField(default="N/A")
    openHours = serializers.CharField(default="N/A")
    generalRule = serializers.CharField(default="N/A")
    childRule = serializers.CharField(default="N/A")

class KeywordSuggestionsSerializer(serializers.Serializer):
    suggestions = serializers.ListField(
        child=serializers.CharField(), 
    )