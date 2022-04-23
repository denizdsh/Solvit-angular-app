import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, interval } from "rxjs";
import { UserService } from "src/app/user/user.service";

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const { authRequired, authFailureRedirectUrl } = route.data;
        
        if (authRequired === this.userService.isAuth) { return true; }

        let redirectUrl = authFailureRedirectUrl;
        if (authRequired) redirectUrl += route.url.length > 0 ? `?redirect=${route.url.join('/')}` : '';

        return this.router.parseUrl(redirectUrl || '/');
    }
}