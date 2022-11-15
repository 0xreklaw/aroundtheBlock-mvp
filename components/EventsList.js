import EventItem from "./EventItem";
import EventContext from "../context/event/eventContext";
import { useContext, useEffect } from "react";

const EventsList = ({ locationFilter }) => {
    const eventContext = useContext(EventContext);
    const { eventList, getEventList, getLocationByName, getCategoryByName, formatedDate } = eventContext;

    useEffect(() => {
        getEventList();
    }, [])

    console.log(eventList)
    return (
        <div>
            {
                eventList.length > 0 ?
            <>
                {
                    eventList && eventList.map((event) => {
                        return <EventItem key={event.id} metadata={event} getLocationByName={getLocationByName} getCategoryByName={getCategoryByName} formatedDate={formatedDate} />
                    })
                }
            </> :
            <p>Uh oh. Looks like there are no events in this city</p>
            }
        </div>
    )
}

export default EventsList;