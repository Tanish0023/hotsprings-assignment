import { useEffect, useState } from "react";
import FavTable from "../components/FavTable";

const FavoritesPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    if (storedEvents.length === 0) {
      setError("No favorite events found.");
      setLoading(false);
      return;
    }

    setEvents(storedEvents);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mt-6">Favorite Events</h2>

      {loading && <p className="text-white mt-4">Loading events...</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {events.length > 0 && <FavTable events={events} setEvents={setEvents} />}
    </div>
  );
};

export default FavoritesPage;
