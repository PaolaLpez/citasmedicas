import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioUrl = 'http://localhost:3000/api/usuario'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.usuarioUrl}`, usuario);
  }

  getDoctoresByEspecialidad(id_especialidad: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.usuarioUrl}/especialidad/${id_especialidad}`);
  }

  getPacienteId(id_paciente: number): Observable<any> {
    return this.http.get<any>(`${this.usuarioUrl}/paciente/id/${id_paciente}`);
  }

  getPacienteNombre(id_paciente: number): Observable<any> {
    return this.http.get<any>(`${this.usuarioUrl}/paciente/nombre/${id_paciente}`);
  } 

getOneUsuario(id_usuario: number): Observable<Usuario>{
  return this.http.get<Usuario>(`${this.usuarioUrl}/${id_usuario}`);
}

  // Otros métodos como getUsuario, updateUsuario, deleteUsuario pueden ser añadidos aquí
}
