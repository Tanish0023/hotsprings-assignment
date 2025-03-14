import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EventDetail from "./EventDetail";
import EventVenue from "./EventVenue";
import { ArrowBack, Favorite } from "@mui/icons-material";
import toast from "react-hot-toast";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface EventCard {
  id: string;
  name: string;
  localDate: string;
  localTime: string;
  artists: string;
  venue: string;
  genres: string;
  priceRange: string;
  ticketStatus: "onsale" | "offsale" | "canceled" | "postponed" | "rescheduled";
  ticketUrl: string;
  seatMap: string;
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

interface EventCardProps {
  event: EventCard;
  removeEventDetail: () => void;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className="min-w-[80%]"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function EventsCard({ event, removeEventDetail }: EventCardProps) {
  const [value, setValue] = React.useState(0);
  const [isFav, setIsFav] = React.useState(false);

  React.useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setIsFav(storedEvents.some((favEvent: { id: string }) => favEvent.id === event.id));
  }, [event.id]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const EventDetailProp = {
    localDate: event.localDate,
    localTime: event.localTime,
    artists: event.artists,
    venue: event.venue,
    genres: event.genres,
    priceRange: event.priceRange,
    ticketStatus: event.ticketStatus,
    ticketUrl: event.ticketUrl,
    seatMap: event.seatMap,
  };

  const EventVenueProp = {
    venueName: event.venueName,
    address: event.address,
    longitude: event.longitude,
    latitude: event.latitude,
    city: event.city,
    phoneNumber: event.phoneNumber,
    openHours: event.openHours,
    generalRule: event.generalRule,
    childRule: event.childRule,
  };

  const toggleFav = () => {
    let storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  
    if (isFav) {
      storedEvents = storedEvents.filter((favEvent: { id: string }) => favEvent.id !== event.id);
      toast.success("Removed from favorites");
    } else {
      const newEvent = {
        id: event.id,
        localDate: event.localDate,
        localTime: event.localTime,
        event: event.name,       
        category: event.genres,  
        venue: event.venue,   
      };
      
      storedEvents.push(newEvent);
      toast.success("Added to favorites");
    }
  
    localStorage.setItem("events", JSON.stringify(storedEvents));
    setIsFav(!isFav);
  };
  

  return (
    <div className="backdrop-blur-2xl border lg:w-[80%] border-white/30 text-white rounded-2xl ">
      <button 
        className="text-lg m-4 flex items-center gap-1.5 hover:underline"
        onClick={removeEventDetail}
      >
        <ArrowBack />  Back
      </button>
      <div className="flex flex-col items-center">
        <div className="text-xl md:text-3xl mb-4 p-3 text-center md:p-6 text-white flex items-center justify-center gap-2.5">
          {event.name}
          <Favorite
            fontSize="large"
            sx={{ color: isFav ? "red" : "white", cursor: "pointer" }}
            onClick={toggleFav}
          />
        </div>

        <div className="w-full">
          <Box sx={{ width: "100%", color: "white" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "#75a682",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tabs value={value} onChange={handleChange} aria-label="event-tabs">
                <Tab label="Event Details" {...a11yProps(0)} sx={{ color: "white" }} />
                <Tab label="Venue Info" {...a11yProps(1)} sx={{ color: "white" }} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <EventDetail eventDetail={EventDetailProp} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <EventVenue eventVenue={EventVenueProp} />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}
