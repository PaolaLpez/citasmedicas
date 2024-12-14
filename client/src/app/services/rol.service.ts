import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private rolUr1 = 'http://localhost:3000/api/rol'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private rolUr2 = 'http://localhost:3000/rol'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getRol() {
    return this.http.get(this.rolUr1);
  }

  getOneRol(id_rol: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.rolUr1}/${id_rol}`);
  }

  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.rolUr1}`, rol);
  }

  updateRol(id_rol: number | string, updateRol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.rolUr1}/${id_rol}`, updateRol);
  }

  deleteRol(id_rol: number | string) {
    return this.http.delete(`${this.rolUr1}/${id_rol}`);
  }
}