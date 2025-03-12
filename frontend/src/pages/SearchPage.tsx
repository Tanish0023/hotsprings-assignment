import EventSearchForm from "../components/EventSearchForm";
import axios from "axios";
import { useState } from "react";
import EventTable from "../components/EventTable";

const API_KEY = "Tq319UhTyemoFfWHeW0I5HWO3QSmeMHY"; // ✅ Use .env variable

const formatEvents = (events: any) => {
    return events.map((event: any) => ({
      id: event.id,
      name: event.name,
      date: event.dates?.start?.localDate || "N/A",
      time: event.dates?.start?.localTime || "N/A",
      icon: event.images?.[0]?.url || "", // 🎨 First image in `images` array
      genre: event.classifications?.[0]?.segment?.name || "N/A",
      venue: event._embedded?.venues?.[0]?.name || "Unknown Venue",
    }));
  };

const CreateEventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEventSubmit = async (eventData: any) => {
    console.log("Event Search Data:", eventData);
    setLoading(true);
    setError("");

    try {
      // ✅ Make API Call
      const response = await axios.get("https://app.ticketmaster.com/discovery/v2/events", {
        params: {
          apikey: API_KEY,
          keyword: eventData.keyword, // 🎯 User's entered keyword
          radius: eventData.distance, // 🎯 Default 50 miles
          classificationName: eventData.category, // 🎯 Category
          latlong: eventData.location.includes("(") ? eventData.location.split("(")[1].replace(")", "") : undefined, // 🎯 Use lat-long if auto-detected
        },
      });
      console.log(eventData.location.includes("(") ? eventData.location.split("(")[1].replace(")", ""): undefined);
      
      // ✅ Extract events
      const eventsList = response.data._embedded?.events || [];
      console.log(eventsList);
      
      if (eventsList.length === 0) {
        setError("No events found. Try another keyword or location.");
      }

      setEvents(eventsList);
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

      {/* ✅ Show Loading State */}
      {loading && <p className="text-white mt-4">Loading events...</p>}

      {/* ✅ Show Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* ✅ Show Events */}
      {events.length > 0 && (
        <div className="w-full max-w-6xl">
            <h2 className="text-xl font-bold text-white mb-4">Search Results</h2>
            <EventTable events={formatEvents(events)} />
        </div>
        )}
    </div>
  );
};

export default CreateEventPage;
