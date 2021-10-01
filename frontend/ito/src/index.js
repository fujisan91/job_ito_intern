import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import StartGame from './pages/StartGame'
import InputName from './pages/InputName'
import Game from './pages/Game'
import Admin from './pages/Admin'
import reportWebVitals from './pages/reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/start" component={StartGame} />
      <Route exact path="/input-name" component={InputName} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
