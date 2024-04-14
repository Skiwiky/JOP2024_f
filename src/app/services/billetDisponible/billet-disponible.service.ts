import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BilletDisponibleService {

  private apiUrl = 'http://localhost:8080/billetsDisponble/v1'
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getBilletDisponible(id: number): Observable<BilletDisponible> {
    return this.http.get<BilletDisponible>(`${this.apiUrl}/${id}`);
  }

  getBilletsDisponibles(queryParams: any): Observable<BilletDisponible[]> {
    return this.http.get<BilletDisponible[]>(this.apiUrl, { params: queryParams });
  }

  createBilletDisponible(billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    return this.http.post<BilletDisponible>(this.apiUrl, billetDisponible{ headers: this.getAuthHeaders() });
  }

  updateBilletDisponible(id: number, billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    return this.http.put<BilletDisponible>(`${this.apiUrl}/${id}`, billetDisponible);
  }

  deleteBilletDisponible(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
