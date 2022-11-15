import { useContext, useEffect } from "react";
import EventContext from "../context/event/eventContext";
import styles from "../styles/Components.module.css";


const FilterByLocation = ({ locationFilter, setLocationFilter }) => {
    const eventContext = useContext(EventContext);
    const { locations, getLocations, filterEventList, getEventList } = eventContext;

    useEffect(() => {
        locations === null && getLocations();
    }, [])

    const onLocationFilter = (index) => {
        filterEventList(index);
        setLocationFilter(index);
    }

    return (
        <div className={styles.filterContainer}>
            {
                locations && locations.map((location, index) => {
                    if (index === locationFilter) {
                        return <p key={index} className="btn-filter" onClick={() => onLocationFilter(index)}>{location.city_name}</p>;
                    }
                    return <p key={index} className="btn-cat" onClick={() => onLocationFilter(index)}>{location.city_name}</p>
                })
            }

            <p className="btn-filter"
                onClick={() => {
                    setLocationFilter(null);
                    getEventList();
                }}>
                Clear
            </p>
        </div>
    )
}

export default FilterByLocation;