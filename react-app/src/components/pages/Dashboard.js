import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import 


function Dashboard() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {

    }, [dispatch]);

    if (!user) history.push('/login')

    return (
        <div>

        </div>
    );
}
export default Dashboard;
