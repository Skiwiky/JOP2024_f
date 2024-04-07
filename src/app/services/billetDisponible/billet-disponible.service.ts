import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BilletDisponible } from 'src/app/model/BilletDisponibles';

@Injectable({
  providedIn: 'root'
})
export class BilletDisponibleService {

  private apiUrl = 'http://localhost:8080/billetsDisponble/v1'
  constructor(private http: HttpClient) {}

  getBilletDisponible(id: number): Observable<BilletDisponible> {
    return this.http.get<BilletDisponible>(`${this.apiUrl}/${id}`);
  }

  getBilletsDisponibles(queryParams: any): Observable<BilletDisponible[]> {
    return this.http.get<BilletDisponible[]>(this.apiUrl, { params: queryParams });
  }

  createBilletDisponible(billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    return this.http.post<BilletDisponible>(this.apiUrl, billetDisponible);
  }

  updateBilletDisponible(id: number, billetDisponible: BilletDisponible): Observable<BilletDisponible> {
    return this.http.put<BilletDisponible>(`${this.apiUrl}/${id}`, billetDisponible);
  }

  deleteBilletDisponible(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
