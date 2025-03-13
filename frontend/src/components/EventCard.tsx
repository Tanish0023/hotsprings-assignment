import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EventDetail from './EventDetail';
import EventVenue from './EventVenue';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface EventCard{
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
    venueName:string;
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
  }

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EventsCard({event}: EventCardProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    
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
    seatMap: event.seatMap
  }

  const EventVenueProp = {
    venueName: event.venueName,
    address: event.address,
    longitude: event.longitude,
    latitude: event.latitude,
    city: event.city,
    phoneNumber: event.phoneNumber,
    openHours: event.openHours,
    generalRule: event.generalRule,
    childRule: event.childRule
  }

  
  return (
    <div className='backdrop-blur-2xl border lg:w-[80%] border-white/30 text-white rounded-2xl flex flex-col items-center'>
      <div className='text-xl md:text-3xl my-4 p-3 text-center md:p-6 text-white'>
        {event.name}
      </div>
      <div className='w-full'>
        <Box sx={{ width: '100%', color: "white" }}>
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              backgroundColor: "#75a682",
              display: "flex", 
              justifyContent: "center", 
            }}
          >
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                sx={{ color: "white", "& .Mui-selected": { color: "white" } }}

            >
              <Tab label="Events" {...a11yProps(0)} sx={{ color: "white" }} />
              <Tab label="Venue" {...a11yProps(1)} sx={{ color: "white" }} />
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
  );
}