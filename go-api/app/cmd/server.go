package cmd

import (
	controllers "app/internal/controller"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Server() {
	// インスタンスを作成
	e := echo.New()
	e.Use(middleware.CORS())

	// ルートを設定

	e.GET("/user", controllers.GetUser)
	e.POST("/user", controllers.RegistUser)

	// サーバーをポート番号1323で起動
	e.Logger.Fatal(e.Start(":1323"))
}
