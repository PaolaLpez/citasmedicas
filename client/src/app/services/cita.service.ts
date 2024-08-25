import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private citaUr1 = 'http://localhost:3000/api/cita'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private citaUr2 = 'http://localhost:3000/cita'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  //getcita trae todas las citas
  getCita() {
    return this.http.get(this.citaUr1);
  }

//get one cita trae una cita por su id
  getOneCita(id_cita: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.citaUr1}/${id_cita}`);
  }
  getCitasByPaciente(id_paciente: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.citaUr1}/paciente/${id_paciente}`);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.citaUr1}`, cita);
  }

  updateCita(id_cita: number | string, updateCita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.citaUr1}/${id_cita}`, updateCita);
  }

  deleteCita(id_cita: number | string) {
    return this.http.delete(`${this.citaUr1}/${id_cita}`);
  }
}