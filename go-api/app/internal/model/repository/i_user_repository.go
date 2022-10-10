package repository

import (
	"app/internal/model/orm"
)

type IUserRepository interface {
	Regist(user *orm.User) (int, error)
	Query(userId int) (*orm.User, error)
	QueryByUserCode(userCode string) (*orm.User, error)
	Update(userId int, user *orm.User) error
}
