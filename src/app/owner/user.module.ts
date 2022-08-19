import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthGuard } from '../shared/guard/auth.guard';
import { UserRoutingModule } from './user-routing.module';
import { JwtInterceptor } from '../shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from '../shared/helpers/error.interceptor';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule

    ],

    providers: [AuthGuard],

    declarations: [],
})
export class UserModule { }
