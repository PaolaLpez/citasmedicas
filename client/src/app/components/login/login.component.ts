import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
//import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
login: any;

  constructor(private loginService: LoginService,
             private router: Router) {}

  onSubmit() {
    this.loginService.login(this.correo, this.contrasena).subscribe(
      (response) => {
        // Guardar el id y redirigir según el rol
        localStorage.setItem('userId', response.id);
        switch (response.role) {
          case 'paciente':
            this.router.navigate(['/inicio-paciente']);
            break;
          case 'doctor':
            this.router.navigate(['/inicio-doctor']);
            break;
          case 'administrador':
            this.router.navigate(['/inicio-administrador']);
            break;
            default:
              console.error('Rol desconocido:', response.role);
        }
      },
      (error) => {
        console.error('Error de autenticación:', error);
        // Mostrar mensaje de error
      }
    );
  }
}
