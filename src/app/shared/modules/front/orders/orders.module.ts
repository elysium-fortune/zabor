import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    AngularMultiSelectModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot()
  ],
  exports: [OrdersComponent]
})
export class OrdersModule { }
