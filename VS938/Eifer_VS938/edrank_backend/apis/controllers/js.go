package controllers

import (
	"net/http"

	"github.com/edrank/edrank_backend/apis/types"
	"github.com/edrank/edrank_backend/apis/utils"
	"github.com/gin-gonic/gin"
)

func OnboardFromJSController(c *gin.Context) {
	var body types.OnboardingAPIBody
	if err := c.BindJSON(&body); err != nil {
		utils.SendError(c, http.StatusBadRequest, err)
		return
	}

	// err := models.CreateBulkStudents(body.Students)

	utils.SendResponse(c, "", map[string]any{
		"students": body.Students,
		"teachers": body.Teachers,
	})
}
