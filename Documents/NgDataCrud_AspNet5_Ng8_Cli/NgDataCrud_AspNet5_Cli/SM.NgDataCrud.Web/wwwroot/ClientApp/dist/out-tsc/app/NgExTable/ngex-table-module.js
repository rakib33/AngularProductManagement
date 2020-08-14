var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageTransferService } from './message-transfer.service';
import { NgExTableConfig } from './ngex-table.config';
import { TableMainDirective } from './table-main.directive';
import { ColumnSortingComponent } from './column-sorting.component';
import { MultiSortingCommandComponent } from './multi-sorting-command.component';
import { PaginationComponent } from './pagination.component';
import { ClientPaginationService } from './client-pagination.service';
import { OptionsComponent } from './options.component';
var NgExTableModule = /** @class */ (function () {
    function NgExTableModule() {
    }
    NgExTableModule = __decorate([
        NgModule({
            declarations: [
                TableMainDirective,
                MultiSortingCommandComponent,
                ColumnSortingComponent,
                PaginationComponent,
                OptionsComponent
            ],
            providers: [
                NgExTableConfig,
                MessageTransferService,
                ClientPaginationService
            ],
            imports: [
                BrowserModule,
                CommonModule,
                FormsModule
            ],
            exports: [
                TableMainDirective,
                MultiSortingCommandComponent,
                ColumnSortingComponent,
                PaginationComponent,
                OptionsComponent
            ],
            entryComponents: [
                PaginationComponent,
                OptionsComponent
            ]
        })
    ], NgExTableModule);
    return NgExTableModule;
}());
export { NgExTableModule };
//# sourceMappingURL=ngex-table-module.js.map