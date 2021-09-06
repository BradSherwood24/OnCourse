import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Profile from '../Profile';
import Aircraft from '../Aircraft';
import Flights from '../Flights';
import Weather from '../Weather';

import './dashboard.css'


function Dashboard() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)


    if (!user) history.push('/login')

    return (
        <div className='dashboard_containing_div'>
            {/* <h1>{user.full_name}'s dashboard</h1> */}
            <div>
                <div>
                    <Profile user={user} />
                </div>
                <div>
                    <Aircraft user={user} />
                </div>
            </div>
            <div>
                <Weather />
            </div>
            <div>
                <Flights user={user} />
            </div>
        </div>
    );
}
export default Dashboard;
