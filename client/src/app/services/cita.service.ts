import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  getCitasByDoctor(arg0: any) {
    throw new Error('Method not implemented.');
  }
  getCitasByPaciente(arg0: any) {
    throw new Error('Method not implemented.');
  }
  private citaUrl = 'http://localhost:3000/api/cita'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  // Método para obtener todas las citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.citaUrl);
  }

  // Método para obtener una cita por ID
  getCita(id_cita: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.citaUrl}/${id_cita}`);
  }

  // Método para crear una nueva cita
  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.citaUrl, cita);
  }

  // Método para actualizar una cita existente
  updateCita(id_cita: number | string, updateCita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.citaUrl}/${id_cita}`, updateCita);
  }

  // Método para eliminar una cita por ID
  deleteCita(id_cita: number | string): Observable<void> {
    return this.http.delete<void>(`${this.citaUrl}/${id_cita}`);
  }

  // Implementación del método registrarCita que reutiliza createCita
  registrarCita(cita: Cita): Observable<any> {
    return this.createCita(cita);
  }

  
}
