import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class especialidadService {
  private especialidadUr1 = 'http://localhost:3000/api/especialidad'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private especialidadUr2 = 'http://localhost:3000/especialidad'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.especialidadUr1}`);
  }

  getOneEspecialidad(id_especialidad: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.especialidadUr1}/${id_especialidad}`);
  }

  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.especialidadUr1}`, especialidad);
  }

  updateEspecialidad(id_especialidad: number | string, updateEspecialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.especialidadUr1}/${id_especialidad}`, updateEspecialidad);
  }

  deleteEspecialidad(id_especialidad: number | string) {
    return this.http.delete(`${this.especialidadUr1}/${id_especialidad}`);
  }
}