import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  getOneUsuario(arg0: any) {
    throw new Error('Method not implemented.');
  }
  private usuarioUrl = 'http://localhost:3000/api/usuario'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario);
  }

  getDoctoresByEspecialidad(id_especialidad: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.usuarioUrl}/especialidad/${id_especialidad}`);
  }

  getPacienteId(id_paciente: number): Observable<any> {
    return this.http.get<any>(`${this.usuarioUrl}/pacientes/${id_paciente}`);
  }

  getPacienteNombre(id_paciente: number): Observable<any> {
    return this.http.get<any>(`${this.usuarioUrl}/pacientes/nombre/${id_paciente}`);
  } 

  // Otros métodos como getUsuario, updateUsuario, deleteUsuario pueden ser añadidos aquí
}
