import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BilletDisponibleService {

 /* private apiUrl = 'http://localhost:8080/billetsDisponble/v1'*/
  private apiUrl = 'https://jo2024-7692bdc14032.herokuapp.com/billetsDisponble/v1'
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getBilletDisponible(id: number): Observable<BilletDisponible> {
    return this.http.get<BilletDisponible>(`${this.apiUrl}/${id}`);
  }

  getBilletsDisponibles(queryParams: any): Observable<BilletDisponible[]> {
    const billetObservable = this.http.get<BilletDisponible[]>(this.apiUrl, { params: queryParams, headers: this.getAuthHeaders()  });
    return billetObservable;
  }

  createBilletDisponible(billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    console.log("on est dans le service de reservation");
    return this.http.post<BilletDisponible>(this.apiUrl, billetDisponible, { headers: this.getAuthHeaders() }).pipe(
      tap(response => {
        console.log("Création réussie", response);
      }),
      catchError((error) => {
          console.error('Erreur de la creation de la reservation', error);
          return throwError(() => new Error('Une erreur est survenue lors de la tentative de creation.'));
      })
  );
  }

  updateBilletDisponible(id: number, billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    return this.http.put<BilletDisponible>(`${this.apiUrl}/${id}`, billetDisponible);
  }

  deleteBilletDisponible(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   // Obtenir les en-têtes d'authentification
   private getAuthHeaders(): HttpHeaders  {
    const tokenJSON = this.storageService.getItemWithExpiry('authToken');
    console.log('tokenJSON'+tokenJSON);
    
    return  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenJSON}`
      });
  }
}
