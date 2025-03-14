import requests
import os
import uuid  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from geolib import geohash
from dotenv import load_dotenv
from .serializers import EventSerializer, EventDetailSerializer, KeywordSuggestionsSerializer

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

def get_lat_long(location_name):
    geo_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location_name}&key={GOOGLE_API_KEY}"
    response = requests.get(geo_url)
    data = response.json()

    if data.get("status") == "OK":
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    
    return None, None

class TicketmasterEventsView(APIView):
    def get(self, request):
        location = request.GET.get("location", "").strip()
        keyword = request.GET.get("keyword", "").strip()
        distance = request.GET.get("distance", "50")
        category = request.GET.get("category", "").strip()

        if not location:
            return Response({"error": "Location is required"}, status=status.HTTP_400_BAD_REQUEST)

        latitude, longitude = get_lat_long(location)
        if latitude is None or longitude is None:
            return Response({"error": "Invalid location"}, status=status.HTTP_400_BAD_REQUEST)

        geo_point = geohash.encode(latitude, longitude, precision=9)

        ticketmaster_url = "https://app.ticketmaster.com/discovery/v2/events.json"
        params = {
            "apikey": TICKETMASTER_API_KEY,
            "keyword": keyword,
            "radius": distance,
            "classificationName": category,
            "geoPoint": geo_point,
            "unit": "miles"
        }

        response = requests.get(ticketmaster_url, params=params)
        data = response.json()

        events = []
        if "_embedded" in data:
            for event in data["_embedded"].get("events", []):
                event_data = {
                    "id": event.get("id", str(uuid.uuid4())),  
                    "name": event.get("name", "N/A"),
                    "localDate": event["dates"]["start"].get("localDate", "N/A"),
                    "localTime": event["dates"]["start"].get("localTime", "N/A"),
                    "image": event["images"][0]["url"] if "images" in event else None,
                    "genre": event["classifications"][0]["segment"]["name"] if "classifications" in event else "N/A",
                    "venue": event["_embedded"]["venues"][0]["name"] if "_embedded" in event and "venues" in event["_embedded"] else "N/A",
                    "url": event.get("url", None),
                }
                events.append(event_data)

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EventDetailView(APIView):
    def get(self, request, event_id):
        if not event_id:
            return Response({"error": "Event ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        event_url = f"https://app.ticketmaster.com/discovery/v2/events/{event_id}.json"

        response = requests.get(event_url, params={"apikey": TICKETMASTER_API_KEY})
        data = response.json()

        if response.status_code == 404 or "name" not in data:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        event_data = {
            "id": data.get("id", "N/A"),
            "name": data.get("name", "N/A"),
            "localDate": data.get("dates", {}).get("start", {}).get("localDate", "N/A"),
            "localTime": data.get("dates", {}).get("start", {}).get("localTime", "N/A"),
            "artists": " | ".join([artist.get("name", "N/A") for artist in data.get("_embedded", {}).get("attractions", [])]),

            "venue": data.get("_embedded", {}).get("venues", [{}])[0].get("name", "N/A"),
            "genres": " | ".join([
                data.get("classifications", [{}])[0].get(key, {}).get("name", "N/A")
                for key in ["segment", "genre", "subGenre", "type", "subType"]
                if data.get("classifications", [{}])[0].get(key)
            ]),

            "priceRange": (
                f"{data.get('priceRanges', [{}])[0].get('min', 'N/A')} - "
                f"{data.get('priceRanges', [{}])[0].get('max', 'N/A')} "
                f"{data.get('priceRanges', [{}])[0].get('currency', 'N/A')}"
                if "priceRanges" in data else "N/A"
            ),

            "ticketStatus": data.get("dates", {}).get("status", {}).get("code", "N/A"),
            "ticketUrl": data.get("url", "#"),
            "seatMap": data.get("seatmap", {}).get("staticUrl", None),

            "venueName": data.get("_embedded", {}).get("venues", [{}])[0].get("name", "N/A"),
            "address": data.get("_embedded", {}).get("venues", [{}])[0].get("address", {}).get("line1", "N/A"),

            "longitude": data.get("_embedded", {}).get("venues", [{}])[0].get("location", {}).get("longitude", "N/A"),
            "latitude": data.get("_embedded", {}).get("venues", [{}])[0].get("location", {}).get("latitude", "N/A"),

            "city": ", ".join(filter(None, [
                data.get("_embedded", {}).get("venues", [{}])[0].get("city", {}).get("name", ""),
                data.get("_embedded", {}).get("venues", [{}])[0].get("state", {}).get("name", "")
            ])),

            "phoneNumber": data.get("_embedded", {}).get("venues", [{}])[0].get("boxOfficeInfo", {}).get("phoneNumberDetail", "N/A"),
            "openHours": data.get("_embedded", {}).get("venues", [{}])[0].get("boxOfficeInfo", {}).get("openHoursDetail", "N/A"),

            "generalRule": data.get("_embedded", {}).get("venues", [{}])[0].get("generalInfo", {}).get("generalRule", "N/A"),
            "childRule": data.get("_embedded", {}).get("venues", [{}])[0].get("generalInfo", {}).get("childRule", "N/A"),
        }


        serializer = EventDetailSerializer(event_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class KeywordSuggestionsView(APIView):
    def get(self, request):
        keyword = request.GET.get("keyword", "").strip()
    
        if not keyword:
            return Response({"error": "Keyword is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        ticketmaster_url = "https://app.ticketmaster.com/discovery/v2/suggest"
        params = {"apikey": TICKETMASTER_API_KEY, "keyword": keyword}

        response = requests.get(ticketmaster_url, params=params)
        data = response.json()

        venuesSuggestion = data.get("_embedded", {}).get("venues", [])
        attractionSuggestion = data.get("_embedded", {}).get("attractions", [])
        combinedSuggestion = venuesSuggestion + attractionSuggestion

        suggestions = [
            attraction["name"] for attraction in combinedSuggestion
        ]

        serializer = KeywordSuggestionsSerializer({"suggestions": suggestions})
        return Response(serializer.data, status=status.HTTP_200_OK)