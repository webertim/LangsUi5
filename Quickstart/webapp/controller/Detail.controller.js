sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	
	"sap/ui/core/UIComponent"
	
], function (Controller, History, MessageToast, UIComponent) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			var htmlContent = this.byId("idHTMLContent");
			htmlContent.setContent("<div class=\"sec-widget\" data-widget=\"abea9f174bbaae26aa3fcc1c67d46bd0\"></div> <script> SEC_HTTPS = true; SEC_BASE = \"compilers.widgets.sphere-engine.com\";  (function(d, s, id){ SEC = window.SEC || (window.SEC = []); var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;  js.src = (SEC_HTTPS ? \"https\" : \"http\") + \"://\" + SEC_BASE + \"/static/sdk/sdk.js\"; fjs.parentNode.insertBefore(js, fjs);    }(document, \"script\", \"sphere-engine-compilers-jssdk\")); </script>");
		},
		_onObjectMatched: function (oEvent) {
			this.byId("rating").reset();
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").programmingLanguagePath),
				model: "programmingLanguage"
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		},

		onRatingChange: function (oEvent) {
			var usernameValue = oEvent.getParameter("usernameValue");
			var performanceValue = oEvent.getParameter("performanceValue");
			var nativelibrariesValue = oEvent.getParameter("nativelibrariesValue");
			var frameworkValue = oEvent.getParameter("frameworkValue");
			var workflowValue = oEvent.getParameter("workflowValue");
			var communityValue = oEvent.getParameter("communityValue");
			
			var overallRating = (performanceValue+nativelibrariesValue+frameworkValue+workflowValue+communityValue)/5;
			
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [usernameValue, overallRating]));
		}
	});
});