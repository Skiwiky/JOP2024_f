import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class TokenResfreshInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // Vérifier si le token est sur le point d'expirer
      if (this.loginService.isTokenExpiringSoon()) {
        // Renouveler le token
        return this.loginService.refreshToken().pipe(
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
