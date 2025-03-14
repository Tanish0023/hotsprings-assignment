import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

interface Event {
  id: string;
  localDate: string;
  localTime: string;
  event: string;
  category: string;
  venue: string;
}

interface FavTableProps {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const FavTable = ({ events, setEvents }: FavTableProps) => {
  const handleDelete = (eventId: string) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    toast.success("Removed from favorites");
  };

  return (
    <TableContainer component={Paper} className="bg-transparent border border-white/30 text-white mt-6">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-white">Date</TableCell>
            <TableCell className="text-white">Time</TableCell>
            <TableCell className="text-white">Event</TableCell>
            <TableCell className="text-white">Category</TableCell>
            <TableCell className="text-white">Venue</TableCell>
            <TableCell className="text-white">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="text-white">{event.localDate}</TableCell>
                <TableCell className="text-white">{event.localTime}</TableCell>
                <TableCell className="text-white">{event.event}</TableCell>
                <TableCell className="text-white">{event.category}</TableCell>
                <TableCell className="text-white">{event.venue}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(event.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white">
                No favorite events found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FavTable;
