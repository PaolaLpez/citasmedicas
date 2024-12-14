/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorUr1 = 'http://localhost:3000/api/doctor'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private doctorUr2 = 'http://localhost:3000/doctor'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.doctorUr1}/especialidad`);
  }

  getDoctoresByEspecialidad(id_especialidad: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.doctorUr1}/especialidad/${id_especialidad}`);
  }

  getDoctor(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.doctorUr1}/doctor`);
  }

  getOneDoctor(id_doctor: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.doctorUr1}/${id_doctor}`);
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.doctorUr1}`, doctor);
  }

  updateDoctor(id_doctor: number | string, updateDoctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.doctorUr1}/${id_doctor}`, updateDoctor);
  }

  deleteDoctor(id_doctor: number | string) {
    return this.http.delete(`${this.doctorUr1}/${id_doctor}`);
  }
} */