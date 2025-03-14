import EventSearchForm from "../components/EventSearchForm";
import axios from "axios";
import { useState } from "react";
import EventTable from "../components/EventTable";
import EventsCard from "../components/EventCard";

const CreateEventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventCardDetail, setEventCardDetail] = useState(null);
  const [loadingEventDetail, setLoadingEventDetail] = useState(false);

  const handleEventSubmit = async (eventData: any) => {
    setLoading(true);
    setError("");
    setEventCardDetail(null); 

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        params: {
          location: eventData.location,
          keyword: eventData.keyword,
          distance: eventData.distance || 50,
          category: eventData.category,
        },
      });

      setEvents(response.data);

      if (response.data.length === 0) {
        setError("No events found. Try another keyword or location.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onClickEventCardDisplay = async (eventId: string) => {
    setLoadingEventDetail(true);
    setError("");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/events/${eventId}`);
      setEventCardDetail(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Failed to fetch event details. Please try again.");
    } finally {
      setLoadingEventDetail(false);
    }
  };

  const removeEventDetail = () => {
    setEventCardDetail(null);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 sm:p-4 w-full sm:w-auto">
      <EventSearchForm onSubmit={handleEventSubmit} />
      {loading && <p className="text-white pt-12 mt-4">Loading events...</p>}
      {error && <p className="text-red-500 pt-12 mt-4">{error}</p>}

      {loadingEventDetail && <p className="text-white pt-12 mt-4">Loading event details...</p>}

      {eventCardDetail ? (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-center pt-12 text-white mb-4">Event Detail</h2>
          <EventsCard event={eventCardDetail} removeEventDetail={removeEventDetail} />
        </div>
      ) : (
        events.length > 0 && (
          <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-center pt-12 text-white mb-4">Search Results</h2>
            <EventTable events={events} onClickDisplay={onClickEventCardDisplay} />
          </div>
        )
      )}
    </div>
  );
};

export default CreateEventPage;
