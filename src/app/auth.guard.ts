import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './service/login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.loginService.getRole();

    // Check the user role and allow or deny access based on the role
    if (route.data['roles'].includes(role)) {
      return true; // Allow access
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page or any other suitable action
      return false; // Deny access
    }
  }
}
