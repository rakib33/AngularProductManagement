import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import  dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import  interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';
import { ReportsComponent } from './reports/reports.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { NestedFormsComponent} from './nestedForms/nested-child.component';
import { ModalModule } from 'ngx-bootstrap/modal';  
import { DatePipe } from '@angular/common';
import { ManageOrderComponent } from './order/manage-order/manage-order.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
// for refresh
import { HashLocationStrategy,LocationStrategy } from '@angular/common';
//https://www.freakyjolly.com/angular-http-spinner-loader-using-ng-http-loader-tutorial-by-example/#.X1Y8JHkzbIU
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BrandComponent,
    CategoryComponent,
    ProductsComponent,
    OrderComponent,
    ReportsComponent,
    AddOrderComponent,
    NestedFormsComponent,
    ManageOrderComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    
    AppRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    FormsModule,    
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    //NgbModule // problem blank page display
  ],
  providers: [DatePipe,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
