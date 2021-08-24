import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Profile from '../Profile';


function Dashboard() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {

    }, [dispatch]);

    if (!user) history.push('/login')

    return (
        <>
            <h1>{user.full_name}'s dashboard</h1>
            <div>
                <Profile user={user} />
            </div>
        </>
    );
}
export default Dashboard;
