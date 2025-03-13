import SocialShare from "./SocialShare";

interface EventDetail{
    localDate: string;
    localTime: string;
    artists: string;
    venue: string;
    genres: string;
    priceRange: string;
    ticketStatus: "onsale" | "offsale" | "canceled" | "postponed" | "rescheduled";
    ticketUrl: string;
    seatMap: string;
}

interface EventDetailProps{
    eventDetail: EventDetail
}

const EventDetail = ({eventDetail}: EventDetailProps) => {
    return ( 
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center flex-1/2">
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Date</div>
                        <div className="text-sm">{eventDetail.localDate} {eventDetail.localTime}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Artist/Team</div>
                        <div className="text-sm text-blue-500">{eventDetail.artists}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Venue</div>
                        <div className="text-sm">{eventDetail.venue}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Genres</div>
                        <div className="text-sm text-center">{eventDetail.genres}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Price Range</div>
                        <div className="text-sm">{eventDetail.priceRange}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Ticket Status</div>
                        <div className="text-sm">{eventDetail.ticketStatus}</div>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <div className="font-semibold">Buy Ticket At:</div>
                        <div className="text-sm text-blue-500 underline">
                            <a href={`${eventDetail.ticketUrl}`} target='_blank'>Ticketmaster</a>
                        </div>
                    </div>
                </div>
                <div className="flex-1/2">
                    <img src={`${eventDetail.seatMap}`} alt={`${eventDetail.venue}`} />
                </div>
            </div>

            <div className="text-center mt-5 flex items-center justify-center gap-3">
                <SocialShare ticketUrl={eventDetail.ticketUrl}/>
            </div>
        </div>
     );
}
 
export default EventDetail;