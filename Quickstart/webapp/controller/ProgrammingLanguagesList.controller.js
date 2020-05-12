sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.ProgrammingLanguagesList", {
		formatter: formatter,
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			
			var oTable = this.getView().byId("ProgrammingLanguagesTable");
			oTable.bindItems({
				path: 'programmingLanguage>/ProgrammingLanguages',
				template: new sap.m.ColumnListItem({
					cells: [
						new sap.m.Text({
							text: "{programmingLanguage>Name}"
						}),
						new sap.m.Text({
							text: "{programmingLanguage>OperationArea}"
						}),
						new sap.m.Text({
							text: "{programmingLanguage>Release}"
						}),
						new sap.m.Text({
							text: "{programmingLanguage>Popularity}"
						}),
						new sap.m.Text({
							text: "{programmingLanguage>GettingStarted}"
						}),
						new sap.m.Text({
							text: "{programmingLanguage>Documentation}"
						}),
						new sap.m.RatingIndicator("noIconSize", {
							enabled: false,
							value: "{programmingLanguage>Rating}",
							tooltip: "This is a tooltip"
						})
						]
				})
			});
		},
		onFilterProgrammingLanguages : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oTable = this.byId("ProgrammingLanguagesTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		}

	});
});