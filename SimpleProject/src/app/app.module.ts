import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

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
    NestedFormsComponent
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
    //NgbModule // problem blank page display
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
