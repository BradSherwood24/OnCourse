import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';

function Splash() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)


    return (
        <div>
            <div className='welcome_splash'>
                <h1>Welcome to On Course</h1>
                <h5>On Course is an app where pilots can easily rent out aircraft for a flight around the pattern, or across the country</h5>
            </div>
            {!user &&
                <div>
                    <NavLink to='/login'>Log In</NavLink>
                    <NavLink to='/signup'>sign Up</NavLink>
                </div>
            }
            <div>
                <h2>Links</h2>
                <a href=''>github project</a>
                <a href=''>github profile</a>
            </div>

        </div>
    );
}
export default Splash;
