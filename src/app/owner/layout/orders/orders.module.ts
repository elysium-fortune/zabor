import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { DataTablesModule } from 'angular-datatables';
import { EditComponent } from './edit/edit.component';
import { OrderdetailModule } from './../../../shared/modules/orderdetail/orderdetail.module';
import { OrdersModule as Orders } from './../../../shared/modules/front/orders/orders.module'

@NgModule({
  declarations: [OrdersComponent, EditComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    DataTablesModule,
    OrderdetailModule,
    Orders
  ]
})
export class OrdersModule { }
