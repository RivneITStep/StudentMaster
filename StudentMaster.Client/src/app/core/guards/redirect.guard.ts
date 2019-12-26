import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
  CanLoad,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@core/services/authentication.service';
import { adminRole, teacherRole, superAdminRole, userRole } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // console.log(this.authService.getUserRole());
    // if (this.authService.HasRole(superAdminRole)) {
    //   this.router.navigate(['superadmin/dashboard']);
    //   return false;
    // }
    // if (this.authService.HasRole(adminRole)) {
    //   this.router.navigate(['admin/dashboard']);
    //   return false;
    // }
    if (this.authService.HasRole(userRole)) {
      return true;
    }
    if (this.authService.HasRole(teacherRole)) {
      this.router.navigate(['teacher']);
      return false;
    }

    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
