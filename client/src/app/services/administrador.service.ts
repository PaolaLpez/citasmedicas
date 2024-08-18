import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private administradorUr1 = 'http://localhost:3000/api/inicio-administrador'; // Asegúrate de que esta URL es correcta
//la ruta tiene que estar igual que en el back-end
//private administradorUr2 = 'http://localhost:3000/inicio-administrador'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  getAdministrador() {
    return this.http.get(this.administradorUr1);
  }

  getOneAdministrador(id_administrador: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.administradorUr1}/${id_administrador}`);
  }

  createAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.administradorUr1}`, administrador);
  }

  updateAdministrador(id_administrador: number | string, updateAdministrador: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${this.administradorUr1}/${id_administrador}`, updateAdministrador);
  }

  deleteAdministrador(id_administrador: number | string) {
    return this.http.delete(`${this.administradorUr1}/${id_administrador}`);
  }
}