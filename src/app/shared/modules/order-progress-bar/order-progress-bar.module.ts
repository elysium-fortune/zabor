import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProgressBarComponent } from './order-progress-bar.component';

@NgModule({
  declarations: [OrderProgressBarComponent],
  imports: [
    CommonModule
  ],
  exports: [OrderProgressBarComponent]
})
export class OrderProgressBarModule { }
