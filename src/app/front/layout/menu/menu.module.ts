import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { SharedPipesModule } from 'src/app/shared';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule,
    FormsModule,
    SharedPipesModule
  ]
})
export class MenuModule { }
