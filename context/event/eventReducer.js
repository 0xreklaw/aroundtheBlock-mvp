import {
    LOCATIONS,
    EVENTLIST,
    SELECTED_EVENT
} from '../types';

const eventReducer = (state, action) => {
    switch (action.type) {
        case LOCATIONS:
            return {
                ...state,
                locations: action.payload
            }
        case EVENTLIST:
            return {
                ...state,
                eventList: action.payload
            }
        case SELECTED_EVENT:
            return {
                ...state,
                selectedEvent: action.payload
            }
        default:
            return state;
    }
}

export default eventReducer