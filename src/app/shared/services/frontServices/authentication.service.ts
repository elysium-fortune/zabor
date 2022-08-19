import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../../shared/class/user';
import { UserService } from './../user.service';
// import { handleError } from '../helpers/handleError';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private route: Router,
        private userSerVice: UserService
    ) {

    }

    login(user: User) {

        const login = `${environment.apiUrl}` + '/api/login';
        return this.http.post<any>(login, user, httpOptions)
            .pipe(map(resp => {
                if (resp.status) {
                    if (resp.data.user && resp.data.token) {
                        this.userSerVice.currentUser = resp.data.user;
                        localStorage.setItem('token', resp.data.token.toString());
                        localStorage.setItem('currentUserId', resp.data.user.id);
                        localStorage.setItem('currentuser', JSON.stringify({ user: resp.data.user }));

                    }
                }
                return resp;

            }));
    }

    socialLogin(data) {
        const login = `${environment.apiUrl}` + '/api/loginbySocial';
        return this.http.post<any>(login, data, httpOptions)
            .pipe(map(resp => {
                if (resp.status) {
                    if (resp.data.user && resp.data.token) {
                        this.userSerVice.currentUser = resp.data.user;
                        localStorage.setItem('token', resp.data.token.toString());
                        localStorage.setItem('currentUserId', resp.data.user.id);
                        localStorage.setItem('currentuser', JSON.stringify({ user: resp.data.user }));

                    }
                }
                return resp;

            }));
    }



    register(user) {
        const registerUrl = environment.apiUrl + "/api/registration";
        return this.http
            .post<any>(`${registerUrl}`, user, httpOptions)

    }

    adminlogin(user: User) {

        const login = `${environment.apiUrl}` + '/admin/login';
        return this.http.post<any>(login, user, httpOptions)
            .pipe(map(resp => {
                if (resp.status) {
                    if (resp.data.user && resp.data.token) {

                        this.userSerVice.currentUser = resp.data.user;
                        localStorage.setItem('token', resp.data.token.toString());
                        localStorage.setItem('currentUserId', resp.data.user.id);
                        localStorage.setItem('currentuser', JSON.stringify({ user: resp.data.user }));
                    }
                }
                return resp;

            }));
    }

    forgetPassword(user) { 
        const forgetPasswordUrl = `${environment.apiUrl}` + '/api/forgetPassword';
        return this.http.post<any>(forgetPasswordUrl, user, httpOptions)
            .pipe(map(resp => {
                return resp;
            }));
    }


    changePassword(data) {
        data.loggedInUser_Id = parseInt(localStorage.getItem("currentUserId"));
        const changePassword = `${environment.apiUrl}` + '/change-password';
        return this.http
            .post<any>(`${changePassword}`, data, httpOptions)
            .pipe(
                map((resp: any) => {
                    return resp;
                })
            )
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentuser');
        localStorage.removeItem('currentUserId');
        // localStorage.removeItem('lat');
        // localStorage.removeItem('long');
        if (this.route.url.split('admin/').length > 1) this.route.navigate(['/admin/login']);
        else this.route.navigate(['/login']);

    }

}
