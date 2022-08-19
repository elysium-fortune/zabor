import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LanguageTranslationModule } from "./shared/modules/language-translation/language-translation.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard, FrontauthGuard } from "./shared";
import { AdminauthGuard } from "./shared";

import { LoginGuard } from "./shared";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./owner/user.component";
import { SharedComponent } from "./shared/shared.component";

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { ImageCropperModule } from 'ngx-image-cropper';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        ImageCropperModule
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        UserComponent,
        SharedComponent,
        NotFoundComponentComponent,

    ],
    providers: [AuthGuard, AdminauthGuard, LoginGuard, FrontauthGuard, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
