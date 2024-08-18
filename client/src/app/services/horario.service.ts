import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private horarioUr1 = 'http://localhost:3000/api/horario'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private horarioUr2 = 'http://localhost:3000/horario'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getHorario() {
    return this.http.get(this.horarioUr1);
  }

  getOneHorario(id_horario: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.horarioUr1}/${id_horario}`);
  }

  createHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.horarioUr1}`, horario);
  }

  updateHorario(id_horario: number | string, updateHorario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.horarioUr1}/${id_horario}`, updateHorario);
  }

  deleteHorario(id_horario: number | string) {
    return this.http.delete(`${this.horarioUr1}/${id_horario}`);
  }
}