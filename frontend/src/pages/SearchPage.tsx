import EventSearchForm from "../components/EventSearchForm";
import axios from "axios";
import { useState } from "react";
import EventTable from "../components/EventTable";
import EventsCard from "../components/EventCard";

const CreateEventPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEventSubmit = async (eventData: any) => {
    setLoading(true);
    setError("");

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

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-0 w-full sm:w-auto">
        <EventSearchForm onSubmit={handleEventSubmit} />
        {loading && <p className="text-white pt-12 mt-4">Loading events...</p>}
        {error && <p className="text-red-500 pt-12 mt-4">{error}</p>}
        <EventsCard event={{
    "id": "G5vYZbfQr1ed2",
    "name": "Coldplay: Music Of The Spheres World Tour - delivered by DHL",
    "localDate": "2025-05-31",
    "localTime": "17:25:00",
    "artists": "Coldplay | WILLOW | Elyanna",
    "venue": "Stanford Stadium",
    "genres": "Music | Rock | Alternative Rock | Undefined | Undefined",
    "priceRange": "33.5 - 223.5 USD",
    "ticketStatus": "onsale",
    "ticketUrl": "https://www.ticketmaster.com/coldplay-music-of-the-spheres-world-stanford-california-05-31-2025/event/1C0061469E2820CF",
    "seatMap": "https://mapsapi.tmol.io/maps/geometry/3/event/1C0061469E2820CF/staticImage?type=png&systemId=HOST",
    "venueName": "Stanford Stadium",
    "address": "625 Nelson Rd.",
    "city": "Stanford, California",
    "phoneNumber": "N/A",
    "openHours": "The Stanford Stadium box office is open 9 AM to 3 PM, Monday through Friday, excluding holidays. Extended hours are dictated by event schedules. Please refer to the information for specific events here: https://gostanford.com/gameday-central",
    "generalRule": "All fans in attendance must adhere to Stanford Athletics' clear bag policy and will be asked to remove cell phones, keys and other large metal objects prior to passing through metal detectors before entering the stadium. While we encourage fans not to bring bags, certain bags are permitted, as outlined by the clear bag policy, which limits the size and type of bags carried into the venue. This policy balances fan needs with the need for fan safety and convenience. For more info, please refer to the stadium policy information page here: https://gostanford.com/facilities/stanford-stadium",
    "childRule": "All ages are welcome. No ticket is required for ages 0-23 months, as long as they do not require a seat of their own."
}} />
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
