import React from 'react';
import ReactDOM from 'react-dom';
import NumberCard from '../component/NumberCard';
import '../css/StartGame.css';
import { getWebSocket } from '../global';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.location.state.userId, 
      myNumber: 0,
      userName: this.props.location.state.userName,
      other_users_numbers: [],
      isSend: false
    }

    let webSocket = getWebSocket();

    this.startWsConnect = this.startWsConnect.bind(this);
    this.sendMyNumber = this.sendMyNumber.bind(this);

    // 通信開始
    this.startWsConnect(webSocket);
  
    let self = this;
    webSocket.addEventListener('message', function(e) {
      let data = JSON.parse(e.data);
      // ユーザーネームを送った場合
      if (data.type === 2) {
        if (self.state.userId === data.id) {
          // 2 stateの更新
          // stateを更新し、画面を描画する
        }
        // 数字を発表した場合
      } else if (data.type === 1) {
        self.setState({
          // 4-2
          // 他のユーザーが発表した数字が配列（other_users_numbers）で返却されるのでその値でstateを更新する
        })
        // お題が送信された場合
      } else if (data.type === 0) {
        // 3 お題の更新
      }
    });
  }

  startWsConnect() {
    let self = this;
    let webSocket = getWebSocket();
    // 接続が正常に行われた場合
    webSocket.onopen = function() {
      webSocket.send(JSON.stringify({
        "type":2,
        "user_id":self.state.userId,
        "user_name":self.state.userName,
        "number":self.state.myNumber,
        "odai":""
      }));
    }
  }

  // 自分の数字を発表する
  sendMyNumber() {
    let self = this;
    let webSocket = getWebSocket();
    self.state.isSend = true
    // 4-1
    // バックエンドに自分の数字（stateのmyNumber）を送信する
  }

  render() {
    return (
      <div>
        <div className="number-card-area">
          {this.state.other_users_numbers.map((data, key) => (
            <NumberCard key={key} number={data.number} userName={data.user_name}></NumberCard>
          ))}
        </div>

        <div className="contents">
          <h2>今回のお題</h2>
          <div>『{this.state.theme}』</div>
          <div className="your-number">あなたの数字は{this.state.myNumber}です。</div>

          <button disabled={this.state.isSend} onClick={() => this.sendMyNumber()}>
            数字を発表する
          </button>
        </div>
      </div>    
    );
  }
}

export default Game;