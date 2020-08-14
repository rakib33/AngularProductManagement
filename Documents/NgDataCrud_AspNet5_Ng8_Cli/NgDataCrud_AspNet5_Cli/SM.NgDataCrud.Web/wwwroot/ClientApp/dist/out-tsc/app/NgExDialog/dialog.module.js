var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DialogHostComponent } from "./dialog-host.component";
import { DialogMainComponent } from "./dialog-main.component";
import { DialogService } from "./dialog.service";
import { ExDialog } from "./ex-dialog.service";
import { DraggableDirective } from './draggable.directive';
import { AlignmentDirective } from './alignment.directive';
import { FocusBlurDirective } from './focus-blur.directive';
import { DialogIconDirective } from './dialog-icon.directive';
import { BasicDialogComponent } from './basic-dialog.component';
import { NgExDialogConfig } from "./dialog-config";
export { DialogComponent } from './dialog.component';
export { DialogService } from './dialog.service';
export { ExDialog } from "./ex-dialog.service";
export { FocusBlurDirective } from "./focus-blur.directive";
export { DialogCache } from "./dialog-cache";
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        NgModule({
            declarations: [
                DialogHostComponent,
                DialogMainComponent,
                DraggableDirective,
                AlignmentDirective,
                FocusBlurDirective,
                DialogIconDirective,
                BasicDialogComponent
            ],
            providers: [
                DialogService,
                ExDialog,
                NgExDialogConfig
            ],
            imports: [
                CommonModule
            ],
            exports: [
                BasicDialogComponent,
                FocusBlurDirective
            ],
            entryComponents: [
                DialogHostComponent,
                DialogMainComponent,
                //SW: also need to declare these items as entryComponent.
                BasicDialogComponent
            ]
        })
    ], DialogModule);
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=dialog.module.js.map