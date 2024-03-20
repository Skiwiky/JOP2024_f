import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    /*if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return false;
    }*/

    if (this.loginService.checkSession()) {
      return true;
    } else {
      this.router.navigate(['/connexion']); 
      return false;
    }

    const userRole = this.loginService.getUserRole();
    const roles = route.data['roles'] as Array<string>;

    // controle des roles avec les roles des routes
    if (roles && roles.indexOf(userRole) === -1) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
