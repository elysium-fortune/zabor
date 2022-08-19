import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from "@ngx-translate/core";

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { LangChangeModule } from 'src/app/shared/modules/front/lang-change/lang-change.module';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        ReactiveFormsModule,
        LangChangeModule,
        FormsModule,
    ],
    declarations: [LayoutComponent, FooterComponent, HeaderComponent]
})
export class LayoutModule { }
