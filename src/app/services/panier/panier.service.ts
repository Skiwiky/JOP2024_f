import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserPaiementDTO } from 'src/app/model/UserPaiementDTO';
import { StorageService } from '../storage/storage.service';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private apiUrl = 'http://localhost:8080/reservations'; 

  constructor(private http: HttpClient,private storageService: StorageService) { }

  createReservation(userPaiementDTO: UserPaiementDTO): Observable<User> {
    console.log("on est dans le service de reservation:", JSON.stringify(userPaiementDTO, null, 2));

    return this.http.post<User>(this.apiUrl, userPaiementDTO, { headers: this.getAuthHeaders() }).pipe(
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
    console.log('tokenJSON: '+ tokenJSON);
    
    return  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenJSON}`
      });
  }
}
