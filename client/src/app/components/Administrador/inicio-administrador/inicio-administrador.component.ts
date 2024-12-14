import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio-administrador',
  templateUrl: './inicio-administrador.component.html',
  styleUrls: ['./inicio-administrador.component.css']
})
export class InicioAdministradorComponent {
  admin = {
    usuario: '',
    nombre: '',
    correo_electronico: '',
    contrasena: ''
  };

  successMessage: string = '';

  // Método para guardar el administrador
  saveAdmin(form: NgForm) {
    if (form.valid) {
      // Aquí se debería manejar la lógica para guardar el nuevo administrador.
      console.log('Administrador registrado:', this.admin);
      
      // Limpiar el formulario después de guardar
      this.clearForm();
      
      // Establecer el mensaje de éxito
      this.successMessage = 'Administrador agregado correctamente';

      // Opcionalmente, limpiar el mensaje de éxito después de un tiempo
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      // Manejar errores de validación si el formulario no es válido
      console.log('Por favor complete todos los campos correctamente.');
    }
  }

  // Método para limpiar el formulario
  clearForm() {
    this.admin = {
      usuario: '',
      nombre: '',
      correo_electronico: '',
      contrasena: ''
    };
  }
}
