package model

// User ユーザー個別のデータ
type User struct {
	// ID
	Id int `json:"id"`
	// ユーザー名
	UserName string `json:"user_name"`
	// ユーザーの番号
	Number int `json:"number"`
}

// NewUser ユーザーを新規作成する。
func NewUser(id int, name string) *User {
	return &User{
		Id:       0,
		UserName: "",
		Number:   0,
	}
}