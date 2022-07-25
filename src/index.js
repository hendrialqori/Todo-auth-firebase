import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/pages/App/Index';
import reportWebVitals from './reportWebVitals';
import {app} from './configs/firebase/index'
import { BrowserRouter as Router } from "react-router-dom";
console.log(app)

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
