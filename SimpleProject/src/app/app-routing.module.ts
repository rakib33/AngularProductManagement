import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { NestedFormsComponent } from './nestedForms/nested-child.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'KiniApi/Index',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'brand',component:BrandComponent},
  {path:'category',component:CategoryComponent},
  {path:'products',component:ProductsComponent},
  {path:'arrayFrom',component:NestedFormsComponent},
  {path:'order',component:OrderComponent,
     children:[
       {path:'add-order',component:AddOrderComponent}
     ]
  },
  {path:'reports',component:ReportsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
