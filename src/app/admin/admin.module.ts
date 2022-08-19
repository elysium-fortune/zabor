import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthGuard } from '../shared/guard/auth.guard';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
    ],
    declarations: [
    ],
    providers: [AuthGuard],
})
export class AdminModule { }
