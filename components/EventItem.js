import Link from "next/link";
import styles from "../styles/Components.module.css";

const EventItem = ({ metadata, getLocationByName, getCategoryByName, formatedDate }) => {
    const {
        categories,
        city_id,
        date,
        event_name,
        id,
    } = metadata

    return (
        <div className={styles.eventItemContainer}>
            <div>
                <h2 style={{maxWidth: 300}} className="title">{event_name}</h2>
                <p className="body">{`${getLocationByName(city_id)}, United States`}</p>
            </div>
            <div className="row">
                {categories.map((category, index) => {
                    return <p key={index} className="btn-cat" style={{marginRight: "12px"}}>{getCategoryByName(parseInt(category))}</p>
                })}
            </div>
            <p className="date">{formatedDate(date)}</p>
            <Link className="btn" href={`/events/${id}`}>View</Link>
        </div>
    )
}

export default EventItem;