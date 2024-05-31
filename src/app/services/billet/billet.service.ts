import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billet } from 'src/app/model/Billet';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BilletService {

 /* private apiUrl = 'http://localhost:8080/billets/v1'; */
   private apiUrl = 'https://jo2024-7692bdc14032.herokuapp.com/billets/v1'; 
  

  constructor(private http: HttpClient, private storageService:StorageService) { }

  getAllBillets(): Observable<Billet[]> {
    return this.http.get<Billet[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }

  getBilletById(id: number): Observable<Billet> {
    return this.http.get<Billet>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

   // Obtenir les en-têtes d'authentification
   private getAuthHeaders(): HttpHeaders  {
    const token = this.storageService.getItemWithExpiry('authToken');
    return  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  }
}
