import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { createAircraft, updateAircraft } from '../store/aircraft';

const AircraftForm = ({ user, aircraft }) => {
    const user_id = user.id
    const [errors, setErrors] = useState([])
    const [price, setPrice] = useState(100);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cover_img, setCover_img] = useState('');
    const [avionics, setAvionics] = useState('')
    const [airport, setAirport] = useState('')
    const [poh, setpoh] = useState('')
    const [type, setType] = useState('single-engine land')
    const [gph, setgph] = useState(10)
    const [fuel_capacity, setFuel_capacity] = useState(55)
    const [cruise_speed, setCruise_speed] = useState(105)
    const [usable_load, setUsable_load] = useState(900)
    const [seats, setSeats] = useState(4)
    const [ifr_cert, setIfr_cert] = useState(false)
    const [need_IR, setNeed_IR] = useState(false)
    const [need_CSEL, setNeed_CSEL] = useState(false)
    const [need_CMEL, setNeed_CMEL] = useState(false)
    const [need_ATP, setNeed_ATP] = useState(false)
    const [need_CFI, setNeed_CFI] = useState(false)
    const [need_CFII, setNeed_CFII] = useState(false)
    const [need_MEI, setNeed_MEI] = useState(false)
    const [need_complex, setNeed_complex] = useState(false)
    const [need_performance, setNeed_performance] = useState(false)
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!aircraft) {
            const data = await dispatch(createAircraft({
                user_id, price, manufacturer,
                name, description, cover_img, avionics,
                ifr_cert, need_IR, need_CSEL, need_CMEL,
                need_ATP, need_CFI, need_CFII, need_MEI,
                need_complex, need_performance, airport,
                type, gph, fuel_capacity, cruise_speed,
                usable_load, seats, poh
            }));
            if (data) {
                setErrors(data)
            }
        }else {
            const data = await dispatch(updateAircraft({
                user_id, price, manufacturer,
                name, description, cover_img, avionics,
                ifr_cert, need_IR, need_CSEL, need_CMEL,
                need_ATP, need_CFI, need_CFII, need_MEI,
                need_complex, need_performance, airport,
                type, gph, fuel_capacity, cruise_speed,
                usable_load, seats, poh
            }, aircraft.id));
            if (data) {
                setErrors(data)
            }
        }
    };

    useEffect(() => {
        if(aircraft) {
            setPrice(aircraft.price)
            setManufacturer(aircraft.manufacturer)
            setName(aircraft.name)
            setDescription(aircraft.description)
            setCover_img(aircraft.cover_img)
            setAvionics(aircraft.avionics)
            setAirport(aircraft.airport)
            setpoh(aircraft.poh)
            setType(aircraft.type)
            setgph(aircraft.gph)
            setFuel_capacity(aircraft.fuel_capacity)
            setCruise_speed(aircraft.cruise_speed)
            setSeats(aircraft.usable_load)
            setSeats(aircraft.seats)
            setIfr_cert(aircraft.ifr_cert)
            setNeed_IR(aircraft.need_IR)
            setNeed_CMEL(aircraft.need_CSEL)
            setNeed_CMEL(aircraft.need_CMEL)
            setNeed_ATP(aircraft.need_ATP)
            setNeed_CFI(aircraft.need_CFI)
            setNeed_CFII(aircraft.need_CFII)
            setNeed_MEI(aircraft.need_MEI)
            setNeed_complex(aircraft.need_complex)
            setNeed_performance(aircraft.need_performance)
        }
    }, [aircraft])


    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
            <h1>New Aircraft</h1>
                <div>
                    <label>price per hour</label>
                    <input
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                    >
                    </input>
                </div>
                <div>
                    <label>manufacturer</label>
                    <input
                        type='text'
                        onChange={e => setManufacturer(e.target.value)}
                        value={manufacturer}
                    >
                    </input>
                </div>
                <div>
                    <label>name</label>
                    <input
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    >
                    </input>
                </div>
                <div>
                    <label>description</label>
                    <input
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    >
                    </input>
                </div>
                <div>
                    <label>Cover Image</label>
                    <input
                        type='text'
                        onChange={e => setCover_img(e.target.value)}
                        value={cover_img}
                    >
                    </input>
                </div>
                <div>
                    <label>avionics</label>
                    <input
                        type='text'
                        onChange={e => setAvionics(e.target.value)}
                        value={avionics}
                    >
                    </input>
                </div>
                <div>
                    <label>airport</label>
                    <input
                        type='text'
                        onChange={e => setAirport(e.target.value)}
                        value={airport}
                    >
                    </input>
                </div>
                <div>
                    <label>Link to poh</label>
                    <input
                        type='text'
                        onChange={e => setpoh(e.target.value)}
                        value={poh}
                    >
                    </input>
                </div>
                <div>
                    <label>type</label>
                    <select
                    onChange={e => setType(e.target.value)}
                    value={type}
                    >
                        <option value='single-engine land'>single-engine land</option>
                        <option value='multi-engine land'>multi-engine land</option>
                        <option value='single-engine sea'>single-engine sea</option>
                        <option value='multi-engine sea'>multi-engine sea</option>
                        <option value='Rotar'>Rotar</option>
                    </select>
                </div>
                <div>
                    <label>gallons per hour</label>
                    <input
                        type='number'
                        onChange={e => setgph(e.target.value)}
                        value={gph}
                    >
                    </input>
                </div>
                <div>
                    <label>fuel capacity</label>
                    <input
                        type='number'
                        onChange={e => setFuel_capacity(e.target.value)}
                        value={fuel_capacity}
                    >
                    </input>
                </div>
                <div>
                    <label>cruise speed</label>
                    <input
                        type='number'
                        onChange={e => setCruise_speed(e.target.value)}
                        value={cruise_speed}
                    >
                    </input>
                </div>
                <div>
                    <label>usable load</label>
                    <input
                        type='number'
                        onChange={e => setUsable_load(e.target.value)}
                        value={usable_load}
                    >
                    </input>
                </div>
                <div>
                    <label>seats</label>
                    <input
                        type='number'
                        onChange={e => setSeats(e.target.value)}
                        value={seats}
                    >
                    </input>
                </div>
                <div>
                    <label>IFR Certified</label>
                    <input
                        type='checkbox'
                        onChange={e => setIfr_cert(e.target.value)}
                        value={ifr_cert}
                    >
                    </input>
                </div>
                <h3>Requirements to fly</h3>
                <div>
                    <label>Need Instrument Rating</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_IR(e.target.value)}
                        value={need_IR}
                    >
                    </input>
                </div>
                <div>
                     <label>Need CSEL</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_CSEL(e.target.value)}
                        value={need_CSEL}
                    >
                    </input>
                </div>
                <div>
                     <label>Need CMEL</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_CMEL(e.target.value)}
                        value={need_CMEL}
                    >
                    </input>
                </div>
                <div>
                     <label>Need ATP</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_ATP(e.target.value)}
                        value={need_ATP}
                    >
                    </input>
                </div>
                <div>
                     <label>Need CFI</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_CFI(e.target.value)}
                        value={need_CFI}
                    >
                    </input>
                </div>
                <div>
                     <label>Need CFII</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_CFII(e.target.value)}
                        value={need_CFII}
                    >
                    </input>
                </div>
                <div>
                     <label>Need MEI</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_MEI(e.target.value)}
                        value={need_MEI}
                    >
                    </input>
                </div>
                <div>
                     <label>Need Complex</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_complex(e.target.value)}
                        value={need_complex}
                    >
                    </input>
                </div>
                <div>
                     <label>Need Performance</label>
                    <input
                        type='checkbox'
                        onChange={e => setNeed_performance(e.target.value)}
                        value={need_performance}
                    >
                    </input>
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
};

export default AircraftForm;
