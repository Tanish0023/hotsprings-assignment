import { useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

interface EventVenue {
  venueName: string;
  address: string;
  location: string;
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

const EventVenue = ({ eventVenue }: EventVenueProps) => {
  const [showFullOpenHours, setShowFullOpenHours] = useState(false);
  const [showFullGeneralRule, setShowFullGeneralRule] = useState(false);
  const [showFullChildRule, setShowFullChildRule] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col flex-1/2 items-center justify-center">
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

      {/* Show on Google Maps */}
      <div className="text-center mt-5">
        <button>
            
        </button>
      </div>
    </div>
  );
};

export default EventVenue;
