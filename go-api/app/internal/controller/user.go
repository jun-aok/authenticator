package controllers

import (
	"net/http"
	"strconv"
	"time"

	"app/internal/model"
	"app/internal/model/authenticator"
	"app/internal/model/orm"
	"app/internal/model/repository"
	"app/pkg/db"
	"app/pkg/logger"
	"app/pkg/util"

	"github.com/labstack/echo/v4"
)

func GetUser(c echo.Context) error {
	// todo ミドルウェアで共通化する
	token, error := authenticator.Auth(c)
	if error != nil {
		logger.Error(error)
		// 400
		return c.String(http.StatusBadRequest, "")
	}
	r := repository.NewUserRepository(db.GetMySQLConnection().GetDbConnection())

	user, error := r.QueryByUserCode(token.UID)
	if error != nil {
		// 処理失敗
		// 500
		return c.String(http.StatusInternalServerError, "")
	}
	if user == nil {
		// 登録されていないユーザー
		// firebaseに登録されていてDBに登録されていないので異常なデータ
		return c.JSON(http.StatusOK, map[string]*orm.User{"user": nil})
	}
	return c.JSON(http.StatusOK, map[string]*orm.User{"user": user})
}

func RegistUser(c echo.Context) error {
	token, error := authenticator.Auth(c)
	if error != nil {
		logger.Error(error)
		// 400
		return c.String(http.StatusBadRequest, "")
	}
	r := repository.NewUserRepository(db.GetMySQLConnection().GetDbConnection())

	i, error := strconv.Atoi(c.FormValue("gender"))
	if error != nil {
		// todo
	}
	gender, error := model.ItoGender(i)
	if error != nil {
		// todo
	}
	user := &orm.User{
		UserCode:  token.Claims["user_id"].(string),
		Email:     token.Claims["email"].(string),
		Name:      c.FormValue("name"),
		BirthDate: *util.GetTime(c.FormValue("birthDate")),
		Gender:    gender,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	userId, error := r.Regist(user)
	if error != nil {
		// todo
	}
	user.UserId = userId
	return c.JSON(http.StatusOK, &user)

}
