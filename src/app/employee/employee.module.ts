import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthGuard } from '../shared/guard/auth.guard';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee.component';



@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule
    ],

    providers: [AuthGuard],

    declarations: [DashboardComponent, EmployeeComponent],
})
export class EmployeeModule { }
