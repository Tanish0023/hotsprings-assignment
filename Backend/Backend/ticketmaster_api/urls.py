from django.urls import path
from .views import TicketmasterEventsView, EventDetailView, KeywordSuggestionsView

urlpatterns = [
    path("events/", TicketmasterEventsView.as_view(), name="ticketmaster-events"),
    path("events/<str:event_id>/", EventDetailView.as_view(), name="event-detail"),
    path("suggestions/", KeywordSuggestionsView.as_view(), name="get_keyword_suggestions"),
]
