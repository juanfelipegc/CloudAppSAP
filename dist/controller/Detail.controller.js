sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/m/library"],function(e,t,i,n){"use strict";var a=n.URLHelper;return e.extend("com.sap.ua.Gateway_352.controller.Detail",{formatter:i,onInit:function(){var e=new t({busy:false,delay:0,lineItemListTitle:this.getResourceBundle().getText("detailLineItemTableHeading")});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);this.setModel(e,"detailView");this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this))},onSendEmailPress:function(){var e=this.getModel("detailView");a.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))},onListUpdateFinished:function(e){var t,i=e.getParameter("total"),n=this.getModel("detailView");if(this.byId("lineItemsList").getBinding("items").isLengthFinal()){if(i){t=this.getResourceBundle().getText("detailLineItemTableHeadingCount",[i])}else{t=this.getResourceBundle().getText("detailLineItemTableHeading")}n.setProperty("/lineItemListTitle",t)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel("appView").setProperty("/layout","TwoColumnsMidExpanded");this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("BusinessPartnerCollection",{BusinessPartnerKey:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("detailView");t.setProperty("/busy",false);this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",true)},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=e.getElementBinding();if(!t.getBoundContext()){this.getRouter().getTargets().display("detailObjectNotFound");this.getOwnerComponent().oListSelector.clearMasterListSelection();return}var i=t.getPath(),n=this.getResourceBundle(),a=e.getModel().getObject(i),o=a.BusinessPartnerKey,s=a.Company,r=this.getModel("detailView");this.getOwnerComponent().oListSelector.selectAListItem(i);r.setProperty("/shareSendEmailSubject",n.getText("shareSendEmailObjectSubject",[o]));r.setProperty("/shareSendEmailMessage",n.getText("shareSendEmailObjectMessage",[s,o,location.href]))},_onMetadataLoaded:function(){var e=this.getView().getBusyIndicatorDelay(),t=this.getModel("detailView"),i=this.byId("lineItemsList"),n=i.getBusyIndicatorDelay();t.setProperty("/delay",0);t.setProperty("/lineItemTableDelay",0);i.attachEventOnce("updateFinished",function(){t.setProperty("/lineItemTableDelay",n)});t.setProperty("/busy",true);t.setProperty("/delay",e)},onCloseDetailPress:function(){this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",false);this.getOwnerComponent().oListSelector.clearMasterListSelection();this.getRouter().navTo("master")},toggleFullScreen:function(){var e=this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen",!e);if(!e){this.getModel("appView").setProperty("/previousLayout",this.getModel("appView").getProperty("/layout"));this.getModel("appView").setProperty("/layout","MidColumnFullScreen")}else{this.getModel("appView").setProperty("/layout",this.getModel("appView").getProperty("/previousLayout"))}}})});