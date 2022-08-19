import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../shared";
import { LoginGuard } from "../shared";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then(m => m.SignupModule),
    canActivate: [LoginGuard]
  },
  {
    path: "forget-password",
    loadChildren: () =>
      import("./forget-password/forget-password.module").then(
        m => m.ForgetPasswordModule
      ),
    canActivate: [LoginGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
