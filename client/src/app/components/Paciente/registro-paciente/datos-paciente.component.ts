import { Component, OnInit, HostBinding } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent {

  @HostBinding('class') classes='row';
  paciente: Usuario = {
    id_rol: 3,  // Rol de paciente
    nombre: '',
    fecha_nac: null,
    genero: '',
    direccion: '',
    tipo_sangre: '',
    curp: '',
    num_telefono: '',
    correo_electronico: '',
    contrasena: '',
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  saveNewPaciente(): void {
    console.log(this.paciente);
    this.usuarioService.createUsuario(this.paciente).subscribe(
      resp => {
        console.log('Paciente creado', resp);
        this.router.navigate(['/inicio-paciente']);
      },
      err => console.error('Error al crear el paciente', err)
    );
  }
}
