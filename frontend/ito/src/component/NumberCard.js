import React from 'react';
import '../css/Game.css';

class NumberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      userName: this.props.userName
    }
  }
  render() {
    return (
      <div className="number-card">
        <p>
          {this.state.number}
        </p>
        <p>
          {this.state.userName}
        </p>
      </div>
    )
  }
}
export default NumberCard;