var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ExDialog } from "../NgExDialog/dialog.module";
import * as glob from './globals';
var DirtyWarning = /** @class */ (function () {
    function DirtyWarning(exDialog) {
        this.exDialog = exDialog;
    }
    DirtyWarning.prototype.canDeactivate = function (component) {
        // if there are no pending changes, just allow deactivation; else confirm first
        var rtn = component.canDeactivate();
        if (rtn) {
            //Close any Angular dialog if opened.
            if (this.exDialog.hasOpenDialog()) {
                this.exDialog.clearAllDialogs();
            }
            glob.caches.pageDirty = false;
        }
        else {
            if (window.confirm("WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to ignore these changes.")) {
                //Close any Angular dialog if opened.
                if (this.exDialog.hasOpenDialog()) {
                    this.exDialog.clearAllDialogs();
                }
                glob.caches.pageDirty = false;
                rtn = true;
            }
            else {
                //Cancel leaving action and stay on the page.
                rtn = false;
            }
        }
        return rtn;
    };
    DirtyWarning = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ExDialog])
    ], DirtyWarning);
    return DirtyWarning;
}());
export { DirtyWarning };
//# sourceMappingURL=dirty-warning.js.map