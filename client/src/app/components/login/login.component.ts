import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthIDService } from '../../services/auto-id.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authIdService: AuthIDService,
  ) {}


  onSubmit() {
    this.loginService.login(this.correo, this.contrasena).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);

        // Guardar el id en el servicio compartido
        this.authIdService.setUsuario(response.id);
  
        // Redirigir según el rol y pasar el ID del usuario en la URL
        switch (response.role) {
          case 'paciente':
            this.router.navigate([`/inicio-paciente/${response.id}`]);
            break;
          case 'doctor':
            this.router.navigate([`/inicio-doctor/${response.id}`]);
            break;
          case 'administrador':
            this.router.navigate([`/inicio-administrador/${response.id}`]);
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
  
  
  volver() {
    this.router.navigate(['/inicio']);
  }
}
