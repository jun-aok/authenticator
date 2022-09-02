package orm

import (
	"app/internal/models"
	"time"
)

type User struct {
	UserId    int
	UserCode  string
	Email     string
	Name      string
	BirthDate time.Time
	Gender    models.Gender
	UpdatedAt time.Time
	DeletedAt time.Time
}
