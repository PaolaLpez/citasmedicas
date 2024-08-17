import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctor = 'http://localhost:3000/api/doctor';//la ruta tiene que estar igual que en el back-end (index.ts)

  constructor(private http: HttpClient) {}

  /* getDoctor(): Observable<Doctor> {
    return this.http.get<Doctor[]>(this.doctor);
  } */

  getOneDoctor(id_doctor: number): Observable<Doctor> {
    return this.http.get<Doctor>('${this.doctor}/${id_doctor}');
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.doctor, doctor);
  }

  updateDoctor(id_doctor: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>('${this.doctor}/${id_doctor}', doctor);
  }

  deleteDoctor(id_doctor: number): Observable<void> {
    return this.http.delete<void>('${this.doctor}/${id}');
  }
}