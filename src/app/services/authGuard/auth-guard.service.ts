import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService, private storageService: StorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(route, state.url);
  }

  private checkLogin(route: ActivatedRouteSnapshot, url: string): boolean {
    
    if (this.loginService.isLoggedIn()) {
      const userJson = this.storageService.getItemWithExpiry('user');
      if (!userJson) {
        this.router.navigate(['/connexion']);
        return false;
      }
  
      const user = JSON.parse(userJson);
      const userRole = user ? user.role : null;
      console.log('UserRole inside checkLogin:', userRole);
      const roles = route.data['roles'] as Array<string>;
      console.log('Required roles:', roles);
      console.log("roles:"+ userRole )
      if (roles && roles.indexOf(userRole) === -1) {
        
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/connexion'], { queryParams: { returnUrl: url } });
      return false;
    }
  }
}
