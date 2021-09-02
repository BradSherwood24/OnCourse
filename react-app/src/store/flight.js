const SET_FLIGHT = 'flight/SET_FLIGHT'
const SET_FLIGHTS = 'flight/SET_FLIGHTS'
const REMOVE_FLIGHT = 'flight/REMOVE_FLIGHT'

const setFlight = (flight) => ({
  type: SET_FLIGHT,
  flight
})

const setFlights = (aircraft) => ({
  type: SET_FLIGHTS,
  aircraft
})

const removeFlight = (id) => ({
  type: REMOVE_FLIGHT,
  id
})

export const setOneFlight = (flight) => async dispatch => {
  dispatch(setFlight(flight))
}

export const createFlight = (flight) => async dispatch => {
  const { user_id, aircraft_id, name, airports, departure, arrival, distance } = flight;

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
    const flight = await res.json();
    dispatch(setFlight(flight))
    return flight
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateFlight = (flight) => async dispatch => {
  const { user_id, aircraft_id, name, airports, departure, arrival, distance, save, flight_id } = flight;

  const res = await fetch(`/api/flight/update/${flight_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        user_id, aircraft_id, airports, departure, arrival, distance, name, save
    })
  });

  if (res.ok) {
    const data = await res.json();
    console.log('DATA!!', data)
    dispatch(setFlight(data))
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

export const deleteFlight = (id) => async dispatch => {
  const res = await fetch(`/api/flight/delete/${id}`, {
    method:'DELETE'
  })
  if(res.ok) {
    const data = await res.json()
    dispatch(removeFlight(id))
    return data
  }
}

const initialState = {};

const flightReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
      case SET_FLIGHT:
        console.log(action.flight)
        newState = action.flight
        return newState
      case SET_FLIGHTS:
        // action.aircraft.aircraft.forEach(air => {
        //   newState[air.id] = air
        // })
        return newState
      case REMOVE_FLIGHT:
        delete newState[action.id]
        return newState
      default:
        return state;
    }
  }

  export default flightReducer
