import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') && localStorage.getItem('currentuser')) {
            // if (localStorage.getItem('currentuser') && JSON.parse(localStorage.getItem('currentuser')).user.role == 'owner') {
            //     this.router.navigate(['owner/dashboard']);
            //     return false;
            // }
            // if (localStorage.getItem('currentuser') && JSON.parse(localStorage.getItem('currentuser')).user.role == 'admin') {
            //     this.router.navigate(['admin/dashboard']);
            //     return false;
            // }
            // else
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}
