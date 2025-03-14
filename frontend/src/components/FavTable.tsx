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
    <TableContainer 
      component={Paper} className="bg-transparent! sm:rounded-xl! backdrop-blur-2xl! md:max-w-[85%] border! border-white/30! mt-6"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-white! text-center!">Date</TableCell>
            <TableCell className="text-white! text-center!">Time</TableCell>
            <TableCell className="text-white! text-center!">Event</TableCell>
            <TableCell className="text-white! text-center!">Category</TableCell>
            <TableCell className="text-white! text-center!">Venue</TableCell>
            <TableCell className="text-white! text-center!">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="text-white! text-center!">{event.localDate}</TableCell>
                <TableCell className="text-white! text-center!">{event.localTime}</TableCell>
                <TableCell className="text-white! text-center!">{event.event}</TableCell>
                <TableCell className="text-white! text-center!">{event.category}</TableCell>
                <TableCell className="text-white! text-center!">{event.venue}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(event.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white!">
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
