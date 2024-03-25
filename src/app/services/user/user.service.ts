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
  
  private apiUrl = 'http://localhost:8080/users/v1';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService, private storageService: StorageService) { }


  // Obtenir tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  

  // Obtenir un utilisateur par ID
  getUserById(userId: number): Observable<HttpEvent<User>> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url, { 
      headers: this.getAuthHeaders(),
      observe: 'response'
    });
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, userUpdated: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<User>(url, userUpdated, { headers: this.getAuthHeaders() });
  }

  // Supprimer un utilisateur
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url,  { headers: this.getAuthHeaders() });
  }

  getUserDetails(): User {
     return  this.loginService.getUser();
    
  }

  // Obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders  {
    const token = this.storageService.getItem('authToken');
    return  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  }
}
