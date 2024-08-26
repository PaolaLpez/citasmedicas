import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthIDService } from '../../../services/auto-id.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrl: './perfil-paciente.component.css'
})
export class PerfilPacienteComponent {

  @HostBinding('class') classes='row';
  paciente : Usuario = {
    id_rol:3 ,
    nombre: '',
    fecha_nac: null,
    genero: '',
    direccion: '',
    tipo_sangre: '',
    curp: '',
    num_telefono: '',
    correo_electronico: '',
    contrasena: '',
  }

  edit : boolean = false

constructor(private usuarioService : UsuarioService,
            private router :Router,
            private activatedRoute : ActivatedRoute,
            private authIdService: AuthIDService
)  {}

ngOnInit(): void {
  // Captura el ID de la URL
  this.activatedRoute.params.subscribe(params => {
    const id_usuario = params['id'];  // Captura el ID del usuario de la URL
    if (id_usuario) {
      // Obtén la información del usuario usando el ID
      this.usuarioService.getOneUsuario(id_usuario).subscribe(
        usuario => {
          if (Array.isArray(usuario) && usuario.length > 0) {
            this.paciente = usuario[0]; // Asigna el primer (y único) elemento del array a `usuario`
            console.log('Información del paciente cargada:', this.paciente);
          } else {
            console.error('No se encontró el usuario con el ID proporcionado.');
          }
        },
        err => {
          console.error('Error al obtener el usuario:', err);
        }
      );
    } else {
      console.error('ID de usuario no proporcionado en la URL');
    }
  });
}


getinfoPaciente(): void {
  const usuario = this.authIdService.getUsuarioStored(); // Recupera el objeto usuario del localStorage
  if (usuario && usuario.id_usuario) {
    this.usuarioService.getOneUsuario(usuario.id_usuario).subscribe(
      resp => {
        this.paciente = resp; // Carga los datos en el formulario
        console.log('Información del paciente cargada:', this.paciente);
      },
      err => {
        console.error('Error al obtener la información del paciente:', err);
      }
    );
  } else {
    console.error('Usuario no identificado');
    // No redirigir al login, simplemente manejar el caso en que no haya usuario.
  }
}

calcularEdad(fecha_nac: Date | null | undefined): number | null {
  if (!fecha_nac) return null;

  const fechaNacimiento = new Date(fecha_nac);
  const diferenciaMs = Date.now() - fechaNacimiento.getTime();
  const edad = new Date(diferenciaMs).getUTCFullYear() - 1970;

  return edad >= 0 ? edad : null; // Asegura que la edad no sea negativa
}

updatePaciente() {
  throw new Error('Method not implemented.');
  }
}

