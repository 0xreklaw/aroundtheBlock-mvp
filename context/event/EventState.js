import { useEffect, useReducer, useState } from 'react'
import EventContext from './eventContext';
import eventReducer from './eventReducer';
import { supabase } from '../../lib/initSupabase';
import {
    LOCATIONS,
    EVENTLIST,
    SELECTED_EVENT,
} from '../types'

const EventState = props => {
    const initialState = {
        locations: null,
        eventList: [],
        selectedEvent: null
    }

    const [state, dispatch] = useReducer(eventReducer, initialState);

    const formatedDate = (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(date).toLocaleDateString(undefined, options)
    }

    const getLocationById = (name) => {
        switch (name) {
            case "New York":
                return 0;
            case "Boston":
                return 1;
            case "San Francisco":
                return 2;
            case "Washington DC":
                return 3;
            case "Austin":
                return 4;
            case "Miami":
                return 5;
            case "Denver":
                return 6;
            case "Los Angeles":
                return 7;
            case "Chicago":
                return 8;
            case "Raleigh":
                return 9;
            case "Charlotte":
                return 10;
            default:
                return ""
        }
    }

    const getLocationByName = (id) => {
        switch (id) {
            case 0:
                return "New York";
            case 1:
                return "Boston";
            case 2:
                return "San Francisco";
            case 3:
                return "Washington DC";
            case 4:
                return "Austin";
            case 5:
                return "Miami";
            case 6:
                return "Denver";
            case 7:
                return "Los Angeles";
            case 8:
                return "Chicago";
            case 9:
                return "Raleigh";
            case 10:
                return "Charlotte"
            default:
                return ""
        }
    }

    const getCategoryByName = (id) => {
        switch (id) {
            case 0:
                return "Dev";
            case 1:
                return "Finance";
            case 2:
                return "Marketing";
            case 3:
                return "Operations";
            case 4:
                return "Consulting";
            case 5:
                return "Law";
            case 6:
                return "Logistics";
            case 7:
                return "Healthcare";
            case 8:
                return "Media";
            case 9:
                return "Analytics";
            case 10:
                return "VC";
            case 11:
                return "NFT";
            case 12:
                return "DAO";
            case 13:
                return "Metaverse"
            default:
                return ""
        }
    }

    const getLocations = async () => {
        let { data: cities, error } = await supabase
            .from('cities')
            .select('city_name')
        dispatch({
            type: LOCATIONS,
            payload: cities
        })
    }

    const getEventList = async () => {
        let { data: events, error } = await supabase
            .from('events')
            .select("*")

        dispatch({
            type: EVENTLIST,
            payload: events
        })
    }

    const resetEventList = async () => {
        dispatch({
            type: EVENTLIST,
            payload: []
        })
    }

    const filterEventList = async (location) => {
        let { data: events, error } = await supabase
            .from('events')
            .select("*")
            .eq("city_id", location)

        resetEventList();

        dispatch({
            type: EVENTLIST,
            payload: events
        })
    }

    const getEvent = async (id) => {
        let { data: events, error } = await supabase
            .from('events')
            .select("*")
            .eq("id", id)

        dispatch({
            type: SELECTED_EVENT,
            payload: events
        })
    }

    const resetEvent = () => {
        dispatch({
            type: SELECTED_EVENT,
            payload: null
        })
    }

    return (
        <EventContext.Provider
            value={{
                locations: state.locations,
                eventList: state.eventList,
                selectedEvent: state.selectedEvent,
                getEventList,
                resetEventList,
                filterEventList,
                getEvent,
                resetEvent,
                getLocationByName,
                getLocationById,
                getCategoryByName,
                formatedDate,
                getLocations
            }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState