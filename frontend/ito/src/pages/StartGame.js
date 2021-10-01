import React from 'react';
import { Link } from 'react-router-dom';
import '../css/StartGame.css';

class StartGame extends React.Component {
  render() {
    return (
      <div>
        <h1>ito</h1>
        <button>{/* 1　inputName.jsの画面に遷移する */}
          start game
        </button>
      </div>
    );
  }
}

export default StartGame;