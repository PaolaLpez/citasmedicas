import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citaUrl = 'http://localhost:3000/api/cita'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.citaUrl);
  }

  getCita(id_cita: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.citaUrl}/${id_cita}`);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.citaUrl, cita);
  }

  updateCita(id_cita: number | string, updateCita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.citaUrl}/${id_cita}`, updateCita);
  }

  deleteCita(id_cita: number | string): Observable<void> {
    return this.http.delete<void>(`${this.citaUrl}/${id_cita}`);
  }
}
