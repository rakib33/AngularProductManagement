var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { NgExTableModule } from '../NgExTable/ngex-table-module';
import { DialogModule } from '../NgExDialog/dialog.module';
import { NgxMyDatePickerModule } from '../ngxMyDatePicker/ngx-my-date-picker.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from "./side-menu.component";
import { HttpDataService } from '../Services/http-data.service';
import { MessageService } from '../Services/message.service';
import { httpClientIntercetor } from "../Services/http-client-intercetor";
import { DirtyWarning } from '../Services/dirty-warning';
import { AjaxLoaderComponent } from './ajax-loader.component';
import { ProductListComponent } from '../PageContents/product-list.component';
import { ProductComponent } from '../PageContents/product.component';
import { ContactsComponent } from '../PageContents/contacts.component';
import { SearchComponent } from '../PageContents/search.component';
import { ValidateErrorComponent } from '../InputValidator/validate-error.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                AjaxLoaderComponent,
                SideMenuComponent,
                ProductListComponent,
                ProductComponent,
                ContactsComponent,
                SearchComponent,
                ValidateErrorComponent
            ],
            imports: [
                BrowserModule,
                CommonModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                NgExTableModule,
                DialogModule,
                NgxMyDatePickerModule.forRoot(),
                RouterModule.forRoot(routes)
            ],
            providers: [
                HttpDataService,
                [DirtyWarning],
                [
                    { provide: HTTP_INTERCEPTORS, useClass: httpClientIntercetor, multi: true }
                ],
                [MessageService]
            ],
            entryComponents: [
                ProductComponent
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map