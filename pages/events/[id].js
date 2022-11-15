import Link from "next/link";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EventContext from "../../context/event/eventContext";

const EventPage = () => {
    const eventContext = useContext(EventContext);
    const { getEvent, selectedEvent, getLocationByName, getCategoryByName, formatedDate } = eventContext;

    const router = useRouter();

    useEffect(() => {
        getEvent(router.query.id);
    }, []);

    return (
        <Layout>
            <Link href="/">← Back</Link>
            {selectedEvent ?
                <>
                    <h2 className="title" style={{marginBottom: "0"}}>{selectedEvent[0].event_name}</h2>

                    <div className="row" style={{ justifyContent: "space-between" }}>
                        <p>{`${getLocationByName(selectedEvent[0].city_id)}, United States`}</p>
                        <p>{formatedDate(selectedEvent[0].date)}</p>
                    </div>


                    <div className="row">
                        {selectedEvent[0].categories.map((category, index) => {
                            return <p key={index} className="btn-cat" style={{ marginRight: "12px" }}>{getCategoryByName(parseInt(category))}</p>
                        })}
                    </div>

                    <p>{selectedEvent[0].summary}</p>

                    <a href={selectedEvent[0].link} className="btn" style={{marginTop: "36px"}}>More Info</a>


                    {/* <p className="btn">I'm Going</p>
                    <p>Attendees</p>
                    <p className="btn">Match</p>
                    <p>Who would you like to connect with before the conference?</p>
                    <p>Finance, Dev, Marketing, DAO, etc.</p> */}
                </>
                :
                <p>Loading</p>
            }
        </Layout>
    )
}

export default EventPage;