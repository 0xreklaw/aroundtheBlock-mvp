import { useEffect, useReducer, useState } from 'react'
import EventContext from './eventContext';
import eventReducer from './eventReducer';
import { supabase } from '../../lib/initSupabase';
import {
    CATEGORIES,
    CITIES,
    EVENTLIST,
    SELECTED_EVENT,
    FILTER_EVENTLIST
} from '../types'

const EventState = props => {
    const initialState = {
        categories: null,
        cities: null,
        eventList: [],
        filteredEventList: [],
        selectedEvent: null
    }

    const [state, dispatch] = useReducer(eventReducer, initialState);

    const formatedDate = (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(date).toLocaleDateString(undefined, options)
    }

    const getCategories = async () => {
        let { data: categories, error } = await supabase
            .from('categories')
            .select('category_name')
        dispatch({
            type: CATEGORIES,
            payload: categories
        })
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

    const getCities = async () => {
        let { data: cities, error } = await supabase
            .from('cities')
            .select('city_name')
        dispatch({
            type: CITIES,
            payload: cities
        })
    }

    const getCityByName = (id) => {
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

    const getCityById = (name) => {
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


    const createEvent = async (event, categories, user_id) => {


        const getProfileId = async () => {
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('user_id', user_id)
            return profiles
        }

        const profileId = await getProfileId()

        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    event_name: event.name,
                    link: event.link,
                    date: event.date,
                    city_id: getCityById(event.location),
                    categories: categories,
                    summary: event.summary,
                    profile_id: profileId[0].id
                },
            ])

        console.log(data)

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

    const getEventList = async () => {
        let { data: events, error } = await supabase
            .from('events')
            .select("*")
            .order('date', { ascending: true })

        dispatch({
            type: EVENTLIST,
            payload: events
        })
    }

    const resetEventList = () => {
        dispatch({
            type: EVENTLIST,
            payload: []
        })
    }

    const filterEventListByCity = async (city) => {
        let { data: events, error } = await supabase
            .from('events')
            .select("*")
            .eq("city_id", city)

        resetEventList();

        dispatch({
            type: EVENTLIST,
            payload: events
        })
    }

    const filterEventList = async (cities, categories) => {
        // let { data: events, error } = await supabase
        //     .from('events')
        //     .select("*")
        //     .eq("city_id", cities)

        // dispatch({
        //     type: FILTER_EVENTLIST,
        //     payload: events
        // })


        for (var i = 0; i < cities.length; i++) {
            const getbyCity = async () => {
                let { data: events, error } = await supabase
                    .from('events')
                    .select("*")
                    .eq("city_id", cities[i])
                // return events

                console.log(cities[i])
                dispatch({
                    type: FILTER_EVENTLIST,
                    payload: events[i]
                })

            }
            await getbyCity()
        }

    }

    const getEvents = async (cities, categories) => {
        for (var i = 0; i < cities.length; i++) {
            const getbyCity = async () => {
                let { data: events, error } = await supabase
                    .from('events')
                    .select("*")
                    .eq("city_id", cities[i])
                // return events
                // console.log(events.length)
                // console.log(cities[i])
                dispatch({
                    type: EVENTLIST,
                    payload: events[i]
                })

            }
            await getbyCity()
        }

        for (var j = 0; j < categories.length; j++) {
            const getbyCategory = async () => {
                let { data: events, error } = await supabase
                    .from('events')
                    .select("*")
                    .eq("category", categories[j])
                // return events
                dispatch({
                    type: EVENTLIST,
                    payload: events[j]
                })
            }
            await getbyCategory();
        }
    }

    return (
        <EventContext.Provider
            value={{
                categories: state.categories,
                cities: state.cities,
                eventList: state.eventList,
                filteredEventList: state.filteredEventList,
                selectedEvent: state.selectedEvent,
                formatedDate,
                getCategories,
                getCategoryByName,
                getCities,
                getCityByName,
                getCityById,
                createEvent,
                getEvent,

                getEvents,
                getEventList,
                filterEventList,

                resetEventList,
                filterEventListByCity
            }}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventState