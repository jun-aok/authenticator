package orm

import (
	"app/internal/model"
	"time"
)

type User struct {
	UserId    int
	UserCode  string
	Email     string
	Name      string
	BirthDate time.Time
	Gender    model.Gender
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time // nullable
}
