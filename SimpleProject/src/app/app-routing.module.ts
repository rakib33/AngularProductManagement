import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'brand',component:BrandComponent},
  {path:'category',component:CategoryComponent},
  {path:'products',component:ProductsComponent},
  {path:'order',component:OrderComponent},
  {path:'reports',component:ReportsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
