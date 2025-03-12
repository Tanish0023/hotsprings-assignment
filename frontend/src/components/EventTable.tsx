import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  icon: string;
  genre: string;
  venue: string;
}

interface EventTableProps {
  events: Event[];
}

const EventTable = ({ events }: EventTableProps) => {
  const navigate = useNavigate(); // ✅ Enables navigation

  return (
    <TableContainer component={Paper} className="bg-transparent border border-white/30 text-white mt-6">
      <Table>
        {/* ✅ Table Headers */}
        <TableHead>
          <TableRow className="">
            <TableCell>Date</TableCell>
            <TableCell>Icon</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Venue</TableCell>
          </TableRow>
        </TableHead>

        {/* ✅ Table Body */}
        <TableBody>
          {events.map((event) => (
            <TableRow 
              key={event.id} 
              className=" cursor-pointer"
              onClick={() => navigate(`/event/${event.id}`)} // ✅ Navigate to Event Page
            >
              <TableCell className="text-white">{event.date} {event.time}</TableCell>
              <TableCell>
                <img src={event.icon} alt={event.name} className="w-12 h-12 object-cover rounded" />
              </TableCell>
              <TableCell className="text-white font-semibold">{event.name}</TableCell>
              <TableCell className="text-white">{event.genre}</TableCell>
              <TableCell className="text-white">{event.venue}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
