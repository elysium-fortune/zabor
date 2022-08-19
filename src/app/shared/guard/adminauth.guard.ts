import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminauthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') && localStorage.getItem('currentuser')) {
            //check if logged in user admin
            if (JSON.parse(localStorage.getItem('currentuser')).user.role == "admin")
                return true;
            else
                this.router.navigate(['/'])
        }
        this.router.navigate(['/admin/login']);
        return false;
    }

}
