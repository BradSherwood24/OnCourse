const SET_AIRCRAFT = 'aircraft/SET_AIRCRAFT'
const SET_AIRCRAFTS = 'aircraft/SET_AIRCRAFTS'
const REMOVE_AIRCRAFT = 'aircraft/REMOVE_AIRCRAFT'

const setAircraft = (aircraft) => ({
  type: SET_AIRCRAFT,
  aircraft
})

const setAircrafts = (aircraft) => ({
  type: SET_AIRCRAFTS,
  aircraft
})

const removeAircraft = (id) => ({
  type: REMOVE_AIRCRAFT,
  id
})

export const getAircraft = () => async dispatch => {
  const res = await fetch('/api/aircraft/');

  if (res.ok) {
    const Aircraft = await res.json();
    dispatch(setAircraft(Aircraft))
  }
}


export const getAircrafts = (id) => async dispatch => {
  const res = await fetch(`/api/user/aircraft/${id}`)

  if (res.ok) {
    const Aircraft = await res.json();
    dispatch(setAircrafts(Aircraft))
  }
}

export const createAircraft = (aircraft) => async dispatch => {
    console.log('in route')
  const { user_id, price, manufacturer,
    name, year, tail_number, description, cover_img, avionics,
    ifr_cert, need_IR, need_CSEL, need_CMEL,
    need_ATP, need_CFI, need_CFII, need_MEI,
    need_complex, need_performance, airport,
    type, gph, fuel_capacity, cruise_speed,
    usable_load, seats, poh} = aircraft;

  const res = await fetch('/api/aircraft/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id, price, manufacturer,
      name, year, tail_number, description, cover_img, avionics,
      ifr_cert, need_IR, need_CSEL, need_CMEL,
      need_ATP, need_CFI, need_CFII, need_MEI,
      need_complex, need_performance, airport,
      type, gph, fuel_capacity, cruise_speed,
      usable_load, seats, poh
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setAircrafts(data))
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

export const deleteAircraft = (id) => async dispatch => {
  const res = await fetch(`/api/aircraft/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    await res.json();
    dispatch(removeAircraft(id))
  }
}

export const updateAircraft = (aircraft, id) => async dispatch => {
  const { user_id, price, manufacturer,
    name, year, tail_number, description, cover_img, avionics,
    ifr_cert, need_IR, need_CSEL, need_CMEL,
    need_ATP, need_CFI, need_CFII, need_MEI,
    need_complex, need_performance, airport,
    type, gph, fuel_capacity, cruise_speed,
    usable_load, seats, poh } = aircraft;

  const res = await fetch(`/api/aircraft/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id, price, manufacturer,
      name, year, tail_number, description, cover_img, avionics,
      ifr_cert, need_IR, need_CSEL, need_CMEL,
      need_ATP, need_CFI, need_CFII, need_MEI,
      need_complex, need_performance, airport,
      type, gph, fuel_capacity, cruise_speed,
      usable_load, seats, poh
    })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(setAircrafts(data))
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

const aircraftReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_AIRCRAFT:
      action.aircraft.aircraft.forEach(air => {
        newState[air.id] = air
      })
      return newState
    case SET_AIRCRAFTS:
      action.aircraft.aircraft.forEach(air => {
        newState[air.id] = air
      })
      return newState
    case REMOVE_AIRCRAFT:
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default aircraftReducer
