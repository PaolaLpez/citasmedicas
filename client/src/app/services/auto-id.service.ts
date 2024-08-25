import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Importa tap para realizar acciones laterales como guardar en localStorage

@Injectable({
  providedIn: 'root'
})
export class AuthIDService {
  private apiUrl = 'http://localhost:3000/api/usuario'; // Ajusta la URL según corresponda
  private usuarioKey = 'usuario';

  constructor(private http: HttpClient) {}

  login(correo_electronico: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo_electronico, contrasena })
      .pipe(
        tap(response => {
          if (response.usuario) {  // Verifica que la respuesta contiene un usuario
            this.setUsuario(response.usuario);  // Almacena la información del usuario en localStorage
          }
        })
      );
  }

  getUsuario(id_usuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id_usuario}`);
  }

  setUsuario(usuario: any): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }
  
  getUsuarioStored(): any {
    const usuarioString = localStorage.getItem(this.usuarioKey);
    return usuarioString ? JSON.parse(usuarioString) : null;
  }
  
  clearUsuario(): void {
    localStorage.removeItem(this.usuarioKey);
  }
}
