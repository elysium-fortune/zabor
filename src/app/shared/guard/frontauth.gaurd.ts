import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class FrontauthGuard implements CanActivate {

    constructor(private router: Router, private Auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('token') && localStorage.getItem('currentuser')) {
            return true;
        } else {
            this.Auth.logout();
            this.router.navigate(['/login']);
            return false;
        }

    }

}
