import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentuser = JSON.parse(localStorage.getItem('currentuser'));
        const token = localStorage.getItem('token');
        //const isFrontEnd = request.url.split('api/front').length > 1;
        // console.log("At JWT interceptor :::", request.url, isFrontEnd);

        if (currentuser && token) {
            const cloned = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return next.handle(cloned);
        }

        return next.handle(request);
    }
}
