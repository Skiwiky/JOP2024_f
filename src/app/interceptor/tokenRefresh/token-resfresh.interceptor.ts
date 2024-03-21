import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable()
export class TokenResfreshInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService, private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const urlsToExclude = ['/home', '/connexion', 'http://localhost:8080/auth/refresh-token'];
   const shouldExclude = urlsToExclude.some(url => request.url.includes(url));
   
      //on verifie l'url 
      if (shouldExclude) {
          return next.handle(request);
        }

      // Vérifier si le token est sur le point d'expirer
      if (this.loginService.isTokenExpiringSoon( this.storageService.getItem('authToken'))) {
        return this.loginService.refreshToken(this.storageService.getItem('authToken')).pipe(
            switchMap((newToken: string) => {
                // Ajouter le nouveau token à la requête originale
                const clonedRequest = request.clone({
                    setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                return next.handle(clonedRequest);
            })
        );
      }

    return next.handle(request);
  }
}
