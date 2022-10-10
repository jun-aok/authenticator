package model

import (
	"fmt"
)

type Gender int

const (
	Empty Gender = 0 + iota
	Male
	Female
	NoAnswer
)

func ItoGender(i int) (Gender, error) {
	m := map[int]Gender{
		1: Male,
		2: Female,
		3: NoAnswer,
	}
	if m[i] == 0 {
		return Empty, fmt.Errorf("Genderではありません")
	}
	return m[i], nil
}
