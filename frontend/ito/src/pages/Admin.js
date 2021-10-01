import React from 'react';
import { getWebSocket } from '../global';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  themeAnnounce() {
    let webSocket = getWebSocket();

    let checkedType = document.getElementsByName('selectTheme');
    let len = checkedType.length;
    let checkValue = '';

    for (let i=0; i<len; i++) {
      // 3 選択された値を取得して変数にいれる
    }

    webSocket.onopen = function() {
      // タイプ 0:お題 1:数字発表 2:ユーザー名
      webSocket.send(JSON.stringify({
        "type":0,
        "user_id":0,
        "user_name":"",
        "number":0,
        "odai":checkValue
      }));
    }

  }
  render() {
    return (
      <div>
        <h1>ito</h1>
        <p>GMの画面だよ</p>
          <p><input type="radio" name="selectTheme" value="生き物"/>生き物</p>
          <p><input type="radio" name="selectTheme" value="学校にあるもの"/>学校にあるもの</p>
          <p><input type="radio" name="selectTheme" value="ゾンビと戦うときに持っていたいもの"/>ゾンビと戦うときに持っていたいもの</p>
          <p><input type="radio" name="selectTheme" value="無人島に持っていきたいもの"/>無人島に持っていきたいもの</p>
          <p><input type="radio" name="selectTheme" value="うれしいこと"/>うれしいこと</p>
          <p><input type="radio" name="selectTheme" value="怖いこと"/>怖いこと</p>
          <p><input type="radio" name="selectTheme" value="かわいいもの"/>かわいいもの</p>
          <p><input type="radio" name="selectTheme" value="楽しいこと"/>楽しいこと</p>
          <p><input type="radio" name="selectTheme" value="テンションが上がるもの/こと"/>テンションが上がること/もの</p>
          <p><input type="radio" name="selectTheme" value="一人暮らしに必要なもの"/>一人暮らしに必要なもの</p>
        <button onClick={() => this.themeAnnounce()}>お題を発表する</button>
      </div>
    );
  }
}

export default Admin;