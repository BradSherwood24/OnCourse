import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';
import './splash.css'

function Splash() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)


    return (
        <div>
            <div className='welcome_splash'>
                <h1>Welcome to On Course</h1>
                <h5 className='description_splash'>On Course is an app where pilots can easily rent out aircraft for a flight around the pattern, or across the country</h5>
            </div>
            <div className='images_splash'>
                <div className='pilots_image_splash'>
                    <h2>For Pilots</h2>
                    <h5>On Course Provides the best experience for pilots, offering an app where they can
                        easily rent out their favorite aircraft. On Course Allows pilots to create and save
                        specific flight with specific aircraft for easy rental in the future.
                    </h5>
                </div>
                <div className='owners_image_splash'>
                    <h2>For Owners</h2>
                    <h5>On Course Provides an easy way for owners to rent out their aircraft and make some
                        money on the side with it. With our simple set up, you can list your aircraft in seconds
                        by simply filling out the form and adding images. We give you complete control with
                        who exactly can rent it, at what cost, and for how long.
                    </h5>
                </div>
            </div>
            {/* <div className='links_splash'>
                <h2>Links</h2>
                <ul>
                    <li><a href='https://github.com/BradSherwood24/OnCourse'>Github Project</a></li>
                    <li><a href='https://github.com/BradSherwood24'>Github Profile</a></li>
                    <li><a href='https://www.linkedin.com/in/bradley-sherwood-36a92615a/'>Linkedin profile</a></li>
                </ul>
            </div> */}

        </div>
    );
}
export default Splash;
