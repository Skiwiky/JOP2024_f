import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:8080/users/v1'; // Votre URL d'API Java
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService, private storageService: StorageService) { }


  // Obtenir tous les utilisateurs
  getAllUsers(): Observable<HttpEvent<User[]>> {
    return this.http.get<User[]>(this.apiUrl, this.getAuthHeaders());
  }

  // Obtenir un utilisateur par ID
  getUserById(userId: number): Observable<HttpEvent<User>> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url, this.getAuthHeaders());
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, userDetails: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    //return this.http.put<User>(url, userDetails, this.getAuthHeaders());
    return this.http.put<User>(url, userDetails, { 
      headers: this.getAuthHeaders(),
      observe: 'body' // retourne juste le User
    });
  }

  // Supprimer un utilisateur
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url, this.getAuthHeaders());
  }

  getUserDetails(): User {
     return  this.loginService.getUser();
    
  }

  // Obtenir les en-têtes d'authentification
  private getAuthHeaders(): any {
    const token = this.storageService.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
