var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/filter';
//import 'rxjs/add/operator/pairwise';
import { NgExDialogConfig } from '../NgExDialog/dialog-config';
import { NgExTableConfig } from '../NgExTable/ngex-table.config';
import { ExDialog } from "../NgExDialog/dialog.module";
import { DialogConfig, TableConfig, PageSizeList } from '../Services/app.config';
import { SideMenuComponent } from "./side-menu.component";
import * as glob from '../Services/globals';
var AppComponent = /** @class */ (function () {
    function AppComponent(ngExDialogConfig, ngExTableConfig, exDialog, router, renderer) {
        this.ngExDialogConfig = ngExDialogConfig;
        this.ngExTableConfig = ngExTableConfig;
        this.exDialog = exDialog;
        this.router = router;
        this.renderer = renderer;
        this.showLoader = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var pThis = this;
        //Merge config items.
        this.ngExDialogConfig.appConfig = DialogConfig;
        this.ngExTableConfig.appConfig = TableConfig;
        this.ngExTableConfig.appPageSizeList = PageSizeList;
        //value[0]: old route; value[1]: new route.
        //this.router.events.filter(value => value instanceof NavigationStart)
        //    .pairwise().subscribe((value: any) => {
        //        if (value[1].url != value[0].url) {
        //            //Dirty warning when clicking broswer navigation button or entering router matching URL.
        //            if (glob.caches.pageDirty) {
        //                //Use browser built-in dialog here. Any HTML template-based Angular dialog is processed after router action that has already reloaded target page. 
        //                if (window.confirm("Do you really want to discard data changes\nand leave the page?")) {
        //                    //Close any Angular dialog if opened.
        //                    if (pThis.exDialog.hasOpenDialog()) {                                
        //                        pThis.exDialog.clearAllDialogs();                                
        //                    }
        //                    //Reset flag.
        //                    glob.caches.pageDirty = false;
        //                }
        //                else {
        //                    //Cancel leaving action and stay on the page.
        //                    //This doesn't work.
        //                    value.preventDefault();                            
        //                }
        //            }
        //            else {
        //                //Auto close dialog if any is opened.
        //                if (pThis.exDialog.hasOpenDialog()) {
        //                    pThis.exDialog.clearAllDialogs();
        //                }
        //            }
        //        }
        //    });             
    };
    //Dirty warning when refreshing or closing browser.
    AppComponent.prototype.beforeUnloadHander = function (event) {
        if (glob.caches.pageDirty) {
            var dialogText = "The page will be refreshed or rediracted to another site but there is unsaved data on this page.";
            event.returnValue = dialogText;
            return dialogText;
        }
    };
    AppComponent.prototype.toggleCollapse = function () {
        var te = this.sideMenuComponent.menuItems.nativeElement.offsetHeight;
        if (te == 0) {
            this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", false);
        }
        else if (te > 0) {
            this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", true);
        }
    };
    AppComponent.prototype.onResize = function (event) {
        this.collapseSideMenu();
    };
    AppComponent.prototype.onClickMenuItem = function ($event) {
        this.collapseSideMenu();
    };
    AppComponent.prototype.collapseSideMenu = function () {
        //When both toggle button and side menu are shown, any resizing screen will close side menu.
        if (this.barButton.nativeElement.offsetHeight > 0 &&
            this.sideMenuComponent.menuItems.nativeElement.offsetHeight > 0) {
            this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", true);
        }
    };
    var _a, _b, _c;
    __decorate([
        ViewChild(SideMenuComponent, { static: true }),
        __metadata("design:type", SideMenuComponent)
    ], AppComponent.prototype, "sideMenuComponent", void 0);
    __decorate([
        ViewChild("barButton", { static: true }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], AppComponent.prototype, "barButton", void 0);
    __decorate([
        HostListener('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "beforeUnloadHander", null);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onResize", null);
    AppComponent = __decorate([
        Component({
            moduleId: module.id.toString(),
            selector: 'app-root',
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.css"]
        }),
        __metadata("design:paramtypes", [NgExDialogConfig,
            NgExTableConfig,
            ExDialog, typeof (_b = typeof Router !== "undefined" && Router) === "function" ? _b : Object, typeof (_c = typeof Renderer !== "undefined" && Renderer) === "function" ? _c : Object])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map