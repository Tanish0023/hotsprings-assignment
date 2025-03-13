import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface EventVenue {
  venueName: string;
  address: string;
  longitude: string; 
  latitude: string;
  city: string;
  phoneNumber: string;
  openHours: string;
  generalRule: string;
  childRule: string;
}

interface EventVenueProps {
  eventVenue: EventVenue;
}

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;

const EventVenue = ({ eventVenue }: EventVenueProps) => {
  const [showFullOpenHours, setShowFullOpenHours] = useState(false);
  const [showFullGeneralRule, setShowFullGeneralRule] = useState(false);
  const [showFullChildRule, setShowFullChildRule] = useState(false);
  const [mapOpen, setMapOpen] = useState(false); 

  const latitude = parseFloat(eventVenue.latitude);
  const longitude = parseFloat(eventVenue.longitude);

  const isValidLocation = !isNaN(latitude) && !isNaN(longitude);

  const center = isValidLocation ? { lat: latitude, lng: longitude } : undefined;

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: MAPS_API_KEY });

  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col flex-1/2 items-center">
          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">Name</div>
            <div className="text-sm">{eventVenue.venueName}</div>
          </div>
          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">Address</div>
            <div className="text-sm">{eventVenue.address}</div>
          </div>
          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">Phone Number</div>
            <div className="text-sm">{eventVenue.phoneNumber}</div>
          </div>
        </div>

        <div className="flex-1/2">
          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">Open Hours</div>
            <div className={`text-sm text-center ${showFullOpenHours ? "" : "line-clamp-3"}`}>
              {eventVenue.openHours}
            </div>
            {eventVenue.openHours.length > 100 && (
              <button
                onClick={() => setShowFullOpenHours(!showFullOpenHours)}
                className="text-blue-400 text-sm hover:underline mt-1"
              >
                {showFullOpenHours ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">General Rule</div>
            <div className={`text-sm text-center ${showFullGeneralRule ? "" : "line-clamp-3"}`}>
              {eventVenue.generalRule}
            </div>
            {eventVenue.generalRule.length > 100 && (
              <button
                onClick={() => setShowFullGeneralRule(!showFullGeneralRule)}
                className="text-blue-400 text-sm hover:underline mt-1"
              >
                {showFullGeneralRule ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          <div className="flex flex-col items-center m-2">
            <div className="font-semibold">Child Rule</div>
            <div className={`text-sm text-center ${showFullChildRule ? "" : "line-clamp-3"}`}>
              {eventVenue.childRule}
            </div>
            {eventVenue.childRule.length > 100 && (
              <button
                onClick={() => setShowFullChildRule(!showFullChildRule)}
                className="text-blue-400 text-sm hover:underline mt-1"
              >
                {showFullChildRule ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => setMapOpen(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Show on Google Maps
        </button>
      </div>

      <Dialog open={mapOpen} onClose={() => setMapOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Venue Location</DialogTitle>
        <DialogContent>
          {isLoaded && isValidLocation ? (
            <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={center!} zoom={14}>
              <Marker position={center!} />
            </GoogleMap>
          ) : (
            <p className="text-red-500">Location not available</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMapOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default EventVenue;
