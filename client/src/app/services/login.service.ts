import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUr1 = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.loginUr1, { correo_electronico: correo, contrasena });
  }
}
