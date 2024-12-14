/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacienteUr1 = 'http://localhost:3000/api/paciente'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private pacienteUr2 = 'http://localhost:3000/paciente'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getPaciente() {
    return this.http.get(this.pacienteUr1);
  }

  getOnePaciente(id_paciente: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.pacienteUr1}/${id_paciente}`);
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.pacienteUr1}`, paciente);
  }

  updatePaciente(id_paciente: number | string, updatePaciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.pacienteUr1}/${id_paciente}`, updatePaciente);
  }

  deletePaciente(id_paciente: number | string) {
    return this.http.delete(`${this.pacienteUr1}/${id_paciente}`);
  }
} */