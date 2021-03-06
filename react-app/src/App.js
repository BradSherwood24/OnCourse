import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/pages/User';
import Dashboard from './components/pages/Dashboard';
import SingleAircraft from './components/pages/SingleAircraft';
import Splash from './components/pages/Splash';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/aircraft/:Id' exact={true} >
          <SingleAircraft />
        </ProtectedRoute>
        <ProtectedRoute path='/dashboard' exact={true} >
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Redirect to='/splash' />;
        </ProtectedRoute>
        <Route path='/splash' exact={true} >
          <Splash />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
