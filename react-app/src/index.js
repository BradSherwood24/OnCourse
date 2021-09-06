import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IconContext } from "react-icons";
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{ className: "react-icons" }}>
      <Provider store={store}>
        <App />
      </Provider>
    </IconContext.Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
