package service

import (
	"math/rand"
)


var numbers []int

func init() {
	// 番号初期化
	numbers = []int{}
}

// ResetNumber 値を初期化する
func ResetNumber()  {
	// 番号初期化
	numbers = []int{}
}

// RandNumber ランダムで番号を付与する
func RandNumber() int {
	var num int 
	num = rand.Intn(99) +1
	return num
}