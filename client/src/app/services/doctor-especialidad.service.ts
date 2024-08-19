import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor_especialidad } from '../models/doctor_especialidad';

@Injectable({
  providedIn: 'root'
})
export class Doctor_especialidadService {
  private doctor_especialidadUr1 = 'http://localhost:3000/api/doctor_especialidad'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private doctor_especialidadUr2 = 'http://localhost:3000/doctor_especialidad'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getDoctor_especialidad() {
    return this.http.get(this.doctor_especialidadUr1);
  }

  getOneDoctor_especialidad(id_doctor: number, id_especialidad: number): Observable<Doctor_especialidad> {
    return this.http.get<Doctor_especialidad>(`${this.doctor_especialidadUr1}/${id_doctor} /${id_especialidad}`);
  }

  createDoctor_especialidad(doctor_especialidad: Doctor_especialidad): Observable<Doctor_especialidad> {
    return this.http.post<Doctor_especialidad>(`${this.doctor_especialidadUr1}`, doctor_especialidad);
  }

  updateDoctor_especialidad(id_doctor: number, id_especialidad: number, updateDoctor_especialidad: Doctor_especialidad): Observable<Doctor_especialidad> {
    return this.http.put<Doctor_especialidad>(`${this.doctor_especialidadUr1}/${id_doctor} /${id_especialidad}`, updateDoctor_especialidad);
  }

  deleteDoctor_especialidad(id_doctor: number, id_especialidad: number) {
    return this.http.delete(`${this.doctor_especialidadUr1}/${id_doctor} /${id_especialidad}`);
  }
}