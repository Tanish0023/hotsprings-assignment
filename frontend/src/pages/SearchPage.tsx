import EventSearchForm from "../components/EventSearchForm";
import axios from "axios";
import { useState } from "react";
import EventTable from "../components/EventTable";

const CreateEventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEventSubmit = async (eventData: any) => {
    console.log("Event Search Data:", eventData);
    setLoading(true);
    setError("");

    try {
      // ✅ Call Django API
      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        params: {
          location: eventData.location,
          keyword: eventData.keyword,
          distance: eventData.distance || 50, // Default 50 miles
          category: eventData.category,
        },
      });

      // ✅ Directly set the serialized response
      setEvents(response.data);
      console.log(events);
      
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

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-0 w-full sm:w-auto">
        <EventSearchForm onSubmit={handleEventSubmit} />
        {loading && <p className="text-white pt-12 mt-4">Loading events...</p>}
        {error && <p className="text-red-500 pt-12 mt-4">{error}</p>}
        {events.length > 0 && (
            <div className="w-full max-w-6xl">
                <h2 className="text-xl font-bold text-center pt-12 text-white mb-4">Search Results</h2>
                <EventTable events={events} />
            </div>
        )}
    </div>
  );
};

export default CreateEventPage;
