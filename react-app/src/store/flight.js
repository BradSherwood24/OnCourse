const SET_FLIGHT = 'aircraft/SET_AIRCRAFT'
const SET_FLIGHTS = 'aircraft/SET_AIRCRAFTS'
const REMOVE_FLIGHT = 'aircraft/REMOVE_AIRCRAFT'

const setAircraft = (aircraft) => ({
  type: SET_FLIGHT,
  aircraft
})

const setAircrafts = (aircraft) => ({
  type: SET_FLIGHTS,
  aircraft
})

const removeAircraft = (id) => ({
  type: REMOVE_FLIGHT,
  id
})

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
