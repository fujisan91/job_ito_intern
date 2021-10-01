import React from 'react';
import '../css/InputName.css';
import axios from "axios";

class InputName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
    this.sendHistory = this.sendHistory.bind(this);
    this.handleChange = this.handleChange.bind(this);  
  }

  sendHistory() {
    // バックエンドに送信するためのユーザーのIDを取得する
    axios.get("http://localhost:6785/getId")
        .then((res) => {
          this.props.history.push({
            pathname: '/game',
            state: {
              userName: this.state.userName,
              userId: parseInt(res.data)
            }
          });
        })
        .catch((err) => {
          // エラー処理
        })

  }
  // テキストエリアが更新するために呼ばれる
  handleChange(event) {
    this.setState({userName: event.target.value});
  }
  render() {
    return (
      <div>
        <h1>ito</h1>
        <div className="display-rule">

          <div className="whatIsIto">
            <h3>■ ITOの遊び方</h3>
              <p>自分の数字の大きさを「テーマに沿った言葉で」表現して、「小さい順に並べる」ゲームです。</p>
          </div>

            <div className="howToPlay">
              <h3>～ゲームの流れ～</h3>

              <div className="howToPlay-detail">
                <div className="title">1. 数字の確認</div>
                  <p className="detail">
                    ニックネームを入力し、自分に割り当てられた数字を確認します。
                  </p>
                <div className="title">2. テーマ発表</div>
                  <p className="detail">
                    ゲームマスターがテーマを発表します。
                  </p>
                <div className="title">3. 手札の宣言</div>
                  <p className="detail">
                  「テーマ」に沿った言葉で、自分の数字を宣言します。<br/>
                    順番はないので、思いついた人から宣言してください。
                  </p>
                <div className="title">4. カードを出す</div>
                  <p className="detail">
                    宣言した表現をもとに「一番小さい数字」を持っている人を推理し、<br/>
                    場にカードを出していきます。
                  </p>
                <div className="title">5. 小さい順にカードを出せたら成功！ゲームクリアです！</div>
              </div>
            </div>

            <div className='rule'>
             <h3> ■ ルール</h3>
              <p className="rule-detail">
                ・自分の数字を言わないこと<br/>
                ・表現は何度変更してもOK！<br/>
                ・他のプレイヤーと同じ言葉で表現してもOK！<br/>
                ・自分の数字より大きい数字が出た場合、自分のカードを場に出してください。<br/>
          　      ゲームはそのまま続行します。<br/>
                ・カードを出し終わった人も相談に参加してOK！
              </p>
            </div>
        </div>
        <div className="username-wrap">
          <input onChange={this.handleChange} className="username-textbox" type="text" placeholder="user name"/>
        </div>
        <button onClick={() => this.sendHistory()}>
          自分の数字を見る
        </button>
      </div>
    );
  }
};

export default InputName;