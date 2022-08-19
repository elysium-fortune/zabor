import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
// import { FrontEndUserService } from '@frontend/shared/services/front-end-user.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        // private userService: FrontEndUserService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
       
            if (err.status == 401) {
                this.authenticationService.logout();
                return throwError('you are not loggedIn');
            }
            if (err.status == 422 && err.error.errors.length > 0) {
                return throwError(err.error.errors[0].msg);
            }
            else {
                return throwError("Something went wrong");
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
