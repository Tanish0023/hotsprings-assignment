import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TableFooter,
} from "@mui/material";

interface Event {
  id: string;
  name: string;
  localDate: string;
  localTime: string;
  image: string;
  genre: string; 
  venue: string; 
}

interface EventTableProps {
  events: Event[];
  onClickDisplay: (eventId: string) => Promise<void>;
}

const EventTable = ({ events, onClickDisplay }: EventTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [orderBy, setOrderBy] = useState<keyof Event>("localDate");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (property: keyof Event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (orderBy === "localDate" || orderBy === "localTime") {
      const dateA = new Date(`${a.localDate}T${a.localTime}`);
      const dateB = new Date(`${b.localDate}T${b.localTime}`);
      return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      const valueA = a[orderBy].toLowerCase();
      const valueB = b[orderBy].toLowerCase();
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
  });

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <TableContainer className="bg-gray-300  md:rounded-2xl">
        <Table>
          <TableHead className="bg-gray-400">
            <TableRow>
              <TableCell className=" text-center font-semibold" style={{ width: '20%', textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "localDate"}
                  direction={orderBy === "localDate" ? order : "asc"}
                  onClick={() => handleSort("localDate")}
                >
                  Date/Time
                </TableSortLabel>
              </TableCell>
              <TableCell className="font-semibold" style={{ width: '20%', textAlign: "center" }}>
                Icon
              </TableCell>
              <TableCell className=" font-semibold" style={{ width: '20%', textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Event
                </TableSortLabel>
              </TableCell>
              <TableCell className=" font-semibold" style={{ width: '20%', textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "genre"}
                  direction={orderBy === "genre" ? order : "asc"}
                  onClick={() => handleSort("genre")}
                >
                  Genre
                </TableSortLabel>
              </TableCell>
              <TableCell className=" font-semibold" style={{ width: '20%', textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "venue"}
                  direction={orderBy === "venue" ? order : "asc"}
                  onClick={() => handleSort("venue")}
                >
                  Venue
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
              <TableRow
                key={event.id}
                className="cursor-pointer hover:bg-white/10"
                onClick={() => onClickDisplay(event.id)}
              >
                <TableCell className="">
                  <div
                    className="flex flex-col items-center justify-center"
                  >
                    <span>{event.localDate}</span>
                    <span>{event.localTime}</span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex! justify-center!">
                    <img src={event.image} alt={event.name} className="w-12 h-12 object-cover rounded " />
                  </div>
                </TableCell>
                <TableCell className=" font-semibold text-center!">{event.name}</TableCell>
                <TableCell className=" text-center!">{event.genre}</TableCell>
                <TableCell className=" text-center!">{event.venue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
                count={events.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 50]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className=""
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      
  );
};

export default EventTable;