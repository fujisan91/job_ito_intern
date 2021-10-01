package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
	"io"
	"job_go/model"
	"net/http"
	"strconv"
	"sync"
)

// ユーザー情報（グローバル）
var Users []model.User
// ゲーム情報
var Game model.Game
// IDのシーケンス
var IdSeq = 0

var connectionPool = struct {
	sync.RWMutex
	connections map[*websocket.Conn]struct{}
}{
	connections: make(map[*websocket.Conn]struct{}),
}

func init() {
	Users = []model.User{}
	Game = model.Game{
		Theme:             "",
		OtherUsersNumbers: []model.User{},
	}
	IdSeq = 0
}

func handleWebSocket(c echo.Context) error {
	errorHandler := make(chan error)
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		connectionPool.Lock()
		connectionPool.connections[ws] = struct{}{}

		defer func(connection *websocket.Conn){
			connectionPool.Lock()
			delete(connectionPool.connections, connection)
			connectionPool.Unlock()
		}(ws)

		connectionPool.Unlock()

		// Client からデータを読み込み
		var request = model.Request{
			Type:     0,
			UserID:   0,
			UserName: "",
			Number:   0,
			Odai:     "",
		}

		for {
			// requestにデータを設定
			err := websocket.JSON.Receive(ws, &request)
			if err != nil {
				c.Logger().Error(err)
				if err != io.EOF {
					errorHandler <- err
				}
			}
			fmt.Println(fmt.Sprintf("リクエスト確認:リクエストタイプ:%v ユーザーID: %v, ユーザー名: %s, お題:%s, 発表番号:%v",request.Type, request.UserID, request.UserName, request.Odai, request.Number))

			response := model.NewResponse()
			// 取得したTypeごとに処理
			switch request.Type {
			case model.TypeTheme:
				// 問題3
				// requestの中からお題を取得し、現在のお題を保持する。
				// またみんなにお題と、タイプを返却する。
				var theme = request.Odai
				var type = request.Type

				return theme, type
			case model.TypeNumber:
				// 問題2
				// リクエストのユーザーIDが一致する対象のユーザーの番号を更新する。
				// また、対象のユーザーを選択済みユーザーとしてユーザーの情報を保持しておく
				// その後はユーザーIDと更新された番号、選択済みユーザーのリスト情報を返却する
				var currentUser User.model

				for i:=0; i<len(Users); i++ {
					if Users[i].UserID == request.UserID {
						currentUser = Users[i]

					}
				}
			case model.TypeUser:
				// 問題1
				// ユーザーを新規作成する。
				// UserModelが存在しているのでそのモデルを新規作成し、
				// リクエストの「ユーザーID」、「ユーザー名」を新規作成したModelに設定する
				// またその際にランダムな数字（既に作成済みのユーザーと被らないよう制御する）を発行し
				// 作成したUserModelに設定する。
				// その後はUsers（UserModelのリスト）に作成したUserModelを追加する
				type User const{
					Id int `json:"id"`
					// ユーザー名
					UserName string `json:"user_name"`
					// ユーザーの番号
					Number int `json:"number"`
				}
			}
			// Client からのメッセージを元に返すメッセージを作成し送信する
			err = sendMessageToAllPool(*response)
			if err != nil {
				c.Logger().Error(err)
			}
		}
	}).ServeHTTP(c.Response(), c.Request())

	err := <- errorHandler
	return err
}

// sendMessageToAllPool 全てのコネクションが貼られているユーザーにresponseを送信する
func sendMessageToAllPool(response model.Response) error {
	connectionPool.RLock()
	defer connectionPool.RUnlock()
	for connection := range connectionPool.connections {
		if err := websocket.JSON.Send(connection, response); err != nil {
			fmt.Println("errorSocket")
			connectionPool.Lock()
			delete(connectionPool.connections, connection)
			connectionPool.Unlock()
			return err
		}
	}
	return nil
}

type TestStruct struct {
	Text string `json:"text"`
	Data string `json:"data"`
}

func TestMethod() echo.HandlerFunc {
	return func(context echo.Context) error {
		var test = TestStruct{
			Text: "test",
			Data: "aaaa",
		}

		return context.JSON(http.StatusOK, test)
	}
}

// 初期化を行う
func GameReset() echo.HandlerFunc {
	// 問題4
	// 保持しているUsers、Game、IDの番号、既に番号した番号をリセットする。
	Type=0,
	UserID=0,
	UserName="",
	Number=0,
	Odai="",
	return func(context echo.Context) error {
		return context.String(http.StatusOK, "OK")
	}
}

// ユーザーIDの再番を行う
func GetUserId() echo.HandlerFunc {
	return func(context echo.Context) error {
		IdSeq++
		return context.String(http.StatusOK, strconv.Itoa(IdSeq))
	}
}

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.Static("/", "public")
	e.GET("/gameStart", handleWebSocket)
	e.GET("/getId", GetUserId())
	e.GET("/reset", GameReset())
	e.Logger.Fatal(e.Start(":6785"))
}