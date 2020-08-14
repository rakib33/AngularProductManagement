import { NgModule, ModuleWithProviders } from '@angular/core';
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

@NgModule({    
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
export class NgExTableModule {
    //static forRoot(): ModuleWithProviders {
    //    return { ngModule: NgExTableModule, providers: [ClientPaginationService] };
    //}
}
