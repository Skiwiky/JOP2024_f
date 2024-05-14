import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserCreation } from 'src/app/model/UserCreation';
import { User } from 'src/app/model/User';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 /* private apiUrl = 'http://localhost:8080/auth';*/
  private apiUrl = 'https://jo2024-7692bdc14032.herokuapp.com/auth';
  private user: User = new User();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { 
    this.initializeAuthState();
  }

  initializeAuthState(): void {
    const token = this.storageService.getItemWithExpiry('authToken');
    const storedUser = this.storageService.getItemWithExpiry('user');
    if (token && storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  signin(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, loginRequest).pipe(
      tap(response => {
          if (response && response.token && response.user) {
              console.log(response);

              this.storageService.setItemWithExpiry('authToken', response.token, 3600000 ); //le token expire au bout d'1 heure  
              this.storageService.setItemWithExpiry('user', JSON.stringify(response.user), 604800000); 
              if (response.user.id) {
                  this.storageService.setItemWithExpiry('idUser', response.user.id.toString(), 604800000); 
              }
              this.user = response.user;
              this.isAuthenticated = true;
              this.router.navigate(['/home']);
          } else {
              console.error('La réponse de connexion ne contient pas les données attendues.');
          }
      }),
      catchError((error) => {
          console.error('Erreur lors de la connexion', error);
          return throwError(() => new Error('Une erreur est survenue lors de la tentative de connexion.'));
      })
    );
  }

  signup(user: UserCreation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user).pipe(
      tap(response => {
    console.log(response);
      })
    );
  }

  logout() {
    this.storageService.clear();
    this.isAuthenticated = false;
    this.clearUser();
    this.router.navigate(['/connexion']);
  }

  clearUser() {
    this.user = new User();
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string {
    return this.user.role;  
  }

  checkSession(): boolean {
    const token = this.storageService.getItemWithExpiry('authToken');
    return !!token;
  }

  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storageService.getItemWithExpiry('authToken')}`
    });
  }

  // Méthode pour vérifier si le token expire bientôt
  isTokenExpiringSoon(token: string): Observable<boolean> {
    console.log("token expire soon?");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/isTokenExpiringSoon`, { headers });
  }

  // Méthode pour renouveler le token
  refreshToken(token: string): Observable<string> {
    console.log("refresh Token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.apiUrl}/refreshToken`, {}, { headers });
  }
}
