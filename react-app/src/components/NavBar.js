
import React from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../images/OnCourse_logo2.png';
import './Navbar.css'


const NavBar = () => {
    const current_user = useSelector(state => state.session.user)
    return (
        <header>
            {current_user &&
                <Link className='logoDiv' to='/dashboard'>
                    <img className='logo' src={logo} alt='logo-main'></img>
                </Link>
            }
            {!current_user &&
                <Link to='/splash'>
                    <img className='logo' src={logo} alt='logo-main-alt'></img>
                </Link>
            }
            <ul>
                <nav className='nav__links'>
                    {!current_user &&
                        <>
                            <li>
                                <NavLink to='/login' exact={true} activeClassName='active'>
                                    Sign In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                    Create Account
                                </NavLink>
                            </li>
                        </>
                    }
                    {current_user &&
                        <>
                            {/* <li>
                                <NavLink to='/aircraft/new' exact={true} activeClassName='active'>
                                    List Your Aircraft
                                </NavLink>
                            </li> */}
                            <li>
                                <LogoutButton />
                            </li>
                        </>
                    }
                </nav>
            </ul>
        </header>
    );
};

export default NavBar;
