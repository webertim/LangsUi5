sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"

], function (Control, RatingIndicator, Label, Button) {
	"use strict";
	return Control.extend("sap.ui.demo.walkthrough.control.ProductRating", {
		metadata : {
			properties : {
				usernameValue: {type : "string", defaultValue : ""},
				performanceValue: 	{type : "float", defaultValue : 0},
				nativelibrariesValue: 	{type : "float", defaultValue : 0},
				frameworkValue: 	{type : "float", defaultValue : 0},
				workflowValue: 	{type : "float", defaultValue : 0},
				communityValue: 	{type : "float", defaultValue : 0}
			},
			aggregations : {
				_usernameLabel: {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_usernameTextfield : {type : "sap.m.Input", multiple: false, visibility : "hidden"},
				_spacer: {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_performanceName : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_performanceRating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_performanceLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_nativelibrariesName : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_nativelibrariesRating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_nativelibrariesLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_frameworkName : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_frameworkRating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_frameworkLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_workflowName : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_workflowRating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_workflowLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_communityName : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_communityRating : {type : "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
				_communityLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				
				_finalLabel : {type : "sap.m.Label", multiple: false, visibility : "hidden"},
				_button : {type : "sap.m.Button", multiple: false, visibility : "hidden"}
			},
			events : {
				change : {
					parameters : {
						usernameValue : {type : "string"},
						performanceValue : {type : "int"},
						nativelibrariesValue : {type : "int"},
						frameworkValue : {type : "int"},
						workflowValue : {type : "int"},
						communityValue : {type : "int"}
					}
				}
			}
		},
		init : function () {
			this.setAggregation("_usernameLabel", new Label({
				text: "{i18n>userNameLabel}",
				width: "9%",
				design: "Bold"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_usernameTextfield", new sap.m.Input({
				width:"21%",
				design: "Bold"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_spacer", new Label({
				text: "",
				width: "60%",
				design: "Bold"
			}).addStyleClass("sapUiSmallMargin"));
			
			this._createRatingBlock("performance");
			this._createRatingBlock("nativelibraries");
			this._createRatingBlock("framework");
			this._createRatingBlock("workflow");
			this._createRatingBlock("community");
			
			
			this.setAggregation("_finalLabel", new Label({
				text: "{i18n>productRatingLabelInitial}",
				width: "26%"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}",
				press: this._onSubmit.bind(this)
			}).addStyleClass("sapUiTinyMarginTopBottom"));
		},

		setValue: function (fValue) {
			
			this.setProperty("usernameValue", "", true);
			this.setProperty("performanceValue", fValue, true);
			this.setProperty("nativelibrariesValue", fValue, true);
			this.setProperty("frameworkValue", fValue, true);
			this.setProperty("workflowValue", fValue, true);
			this.setProperty("communityValue", fValue, true);
			
			
			this.getAggregation("_usernameTextfield").setValue("");
			this.getAggregation("_performanceRating").setValue(fValue);
			this.getAggregation("_nativelibrariesRating").setValue(fValue);
			this.getAggregation("_frameworkRating").setValue(fValue);
			this.getAggregation("_workflowRating").setValue(fValue);
			this.getAggregation("_communityRating").setValue(fValue);

		},

		_createRatingBlock : function(name) {
			this.setAggregation("_" + name + "Name", new Label({
				text: name,
				width:"10%",
				design: "Bold"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_" + name + "Rating", new RatingIndicator({
				value: 0,
				iconSize: "2rem",
				visualMode: "Half",
				liveChange: this._onRate.bind(this),
				width: "20%"
			}));
			this.setAggregation("_" + name + "Label", new Label({
				width:"70%",
				design: "Bold"
			}).addStyleClass("sapUiSmallMargin"));
		},

		reset: function () {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.setValue(0);
			this.getAggregation("_finalLabel").setDesign("Standard");
			
			this.getAggregation("_usernameTextfield").setEnabled(true);
			
			this.getAggregation("_performanceRating").setEnabled(true);
			this.getAggregation("_nativelibrariesRating").setEnabled(true);
			this.getAggregation("_frameworkRating").setEnabled(true);
			this.getAggregation("_workflowRating").setEnabled(true);
			this.getAggregation("_communityRating").setEnabled(true);
			
			this._resetRatingLabel("_performanceLabel", "_performanceRating");
			this._resetRatingLabel("_nativelibrariesLabel", "_nativelibrariesRating");
			this._resetRatingLabel("_frameworkLabel", "_frameworkRating");
			this._resetRatingLabel("_workflowLabel", "_workflowRating");
			this._resetRatingLabel("_communityLabel", "_communityRating");
			

			this.getAggregation("_finalLabel").setText(oResourceBundle.getText("productRatingLabelInitial"));

			this.getAggregation("_button").setEnabled(true);
		},
		
		_resetRatingLabel : function(labelName, ratingName)
		{
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			var aggregation = this.getAggregation(ratingName);
			this.getAggregation(labelName).setText(oResourceBundle.getText("productRatingLabelIndicator", [0, aggregation.getMaxValue()]));
		},
		
		_onRate : function (oEvent) {
			var oRessourceBundle = this.getModel("i18n").getResourceBundle();
			var fValue = oEvent.getParameter("value");
			
			var aggregation;
			switch (oEvent.getSource().sParentAggregationName) {
			  case "_performanceRating":
			    aggregation = this.getAggregation("_performanceLabel");
			    this.setProperty("performanceValue", fValue, true);
			    break;
			  case "_nativelibrariesRating":
			    aggregation = this.getAggregation("_nativelibrariesLabel");
				this.setProperty("nativelibrariesValue", fValue, true);
			    break;
			  case "_frameworkRating":
			    aggregation = this.getAggregation("_frameworkLabel");
				this.setProperty("frameworkValue", fValue, true);
			    break;
		       case "_workflowRating":
			    aggregation = this.getAggregation("_workflowLabel");
				this.setProperty("workflowValue", fValue, true);
			    break;
    		  case "_communityRating":
			    aggregation = this.getAggregation("_communityLabel");
				this.setProperty("communityValue", fValue, true);
			    break;
			  default:
			    aggregation = this.getAggregation("_performanceLabel");
				this.setProperty("performanceValue", fValue, true);
			    break;
			}

			aggregation.setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			aggregation.setDesign("Bold");
		},

		_onSubmit : function (oEvent) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.getAggregation("_usernameTextfield").setEnabled(false);
			this.getAggregation("_performanceRating").setEnabled(false);
			this.getAggregation("_nativelibrariesRating").setEnabled(false);
			this.getAggregation("_frameworkRating").setEnabled(false);
			this.getAggregation("_workflowRating").setEnabled(false);
			this.getAggregation("_communityRating").setEnabled(false);
			
			this.getAggregation("_finalLabel").setText(oResourceBundle.getText("productRatingLabelFinal"));
			this.getAggregation("_button").setEnabled(false);
			
			this.setProperty("usernameValue", this.getAggregation("_usernameTextfield").getValue(), true);
			
			this.fireEvent("change", {
				usernameValue : this.getUsernameValue(),
				performanceValue: this.getPerformanceValue(),
				nativelibrariesValue: this.getNativelibrariesValue(),
				frameworkValue: this.getFrameworkValue(),
				workflowValue: this.getWorkflowValue(),
				communityValue: this.getCommunityValue()
			});
		},
		renderer : function (oRm, oControl) {
			oRm.openStart("div", oControl);
			oRm.class("myAppDemoWTProductRating");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_usernameLabel"));
			oRm.renderControl(oControl.getAggregation("_usernameTextfield"));
			oRm.renderControl(oControl.getAggregation("_spacer"));
			
			oRm.renderControl(oControl.getAggregation("_performanceName"));
			oRm.renderControl(oControl.getAggregation("_performanceRating"));
			oRm.renderControl(oControl.getAggregation("_performanceLabel"));
			
			oRm.renderControl(oControl.getAggregation("_nativelibrariesName"));
			oRm.renderControl(oControl.getAggregation("_nativelibrariesRating"));
			oRm.renderControl(oControl.getAggregation("_nativelibrariesLabel"));
			
			oRm.renderControl(oControl.getAggregation("_frameworkName"));
			oRm.renderControl(oControl.getAggregation("_frameworkRating"));
			oRm.renderControl(oControl.getAggregation("_frameworkLabel"));
			
			oRm.renderControl(oControl.getAggregation("_workflowName"));
			oRm.renderControl(oControl.getAggregation("_workflowRating"));
			oRm.renderControl(oControl.getAggregation("_workflowLabel"));
			
			oRm.renderControl(oControl.getAggregation("_communityName"));
			oRm.renderControl(oControl.getAggregation("_communityRating"));
			oRm.renderControl(oControl.getAggregation("_communityLabel"));
			
			oRm.renderControl(oControl.getAggregation("_finalLabel"));
			oRm.renderControl(oControl.getAggregation("_button"));
			oRm.close("div");
		}
	});
});