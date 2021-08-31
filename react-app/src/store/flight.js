const SET_FLIGHT = 'aircraft/SET_AIRCRAFT'
const SET_FLIGHTS = 'aircraft/SET_AIRCRAFTS'
const REMOVE_FLIGHT = 'aircraft/REMOVE_AIRCRAFT'

const setFlight = (aircraft) => ({
  type: SET_FLIGHT,
  aircraft
})

const setFlightss = (aircraft) => ({
  type: SET_FLIGHTS,
  aircraft
})

const removeFlight = (id) => ({
  type: REMOVE_FLIGHT,
  id
})

export const createFlight = (flight) => async dispatch => {
  const { user_id, aircraft_id, name, airports, departure, arrival, distance } = flight;
  console.log(user_id)

  const res = await fetch('/api/flight/new', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id, aircraft_id, airports, departure, arrival, distance, name
    })
  });

  if (res.ok) {
    const data = await res.json();
    // dispatch(setflights(data))
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = {};

const flightReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
      case SET_FLIGHT:
        // action.flight.flight.forEach(air => {
        //   newState[air.id] = air
        // })
        return newState
      case SET_FLIGHTS:
        // action.aircraft.aircraft.forEach(air => {
        //   newState[air.id] = air
        // })
        return newState
      case REMOVE_FLIGHT:
        // delete newState[action.id]
        // return newState
      default:
        return state;
    }
  }

  export default flightReducer
