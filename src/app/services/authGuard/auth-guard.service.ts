import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
     // Vérifiez si l'utilisateur est connecté
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return false;
    }

    // Récupérer le rôle de l'utilisateur
    const userRole = this.loginService.getUserRole();

    // Récupérer les rôles autorisés de la route
    const roles = route.data['roles'] as Array<string>;

    // Si des rôles sont spécifiés et que le rôle de l'utilisateur n'est pas inclus, rediriger
    if (roles && roles.indexOf(userRole) === -1) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
