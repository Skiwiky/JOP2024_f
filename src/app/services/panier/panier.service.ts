import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Reservation } from 'src/app/model/Reservation';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private apiUrl = 'http://localhost:8080/reservations'; 

  constructor(private http: HttpClient,private storageService: StorageService) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    console.log("on est dans le service de reservation");
    return this.http.post<Reservation>(this.apiUrl, reservation, { headers: this.getAuthHeaders() }).pipe(
      tap(response => {
        console.log("Création réussie", response);
      }),
      catchError((error) => {
          console.error('Erreur de la creation du reservation', error);
          return throwError(() => new Error('Une erreur est survenue lors de la tentative de creation.'));
      })
  );
  }

   // Obtenir les en-têtes d'authentification
   private getAuthHeaders(): HttpHeaders  {
    const tokenJSON = this.storageService.getItemWithExpiry('authToken');
    console.log('tokenJSON: '+tokenJSON);
    
    return  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenJSON}`
      });
  }
}
