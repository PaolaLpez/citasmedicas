import { Component, OnInit, HostBinding } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute,Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrl: './perfil-paciente.component.css'
})
export class PerfilPacienteComponent {
onSubmit(_t20: NgForm) {
throw new Error('Method not implemented.');
}
updatePaciente() {
throw new Error('Method not implemented.');
}

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
            private activatedRoute : ActivatedRoute
)  {}

ngOnInit(){
  const params = this.activatedRoute.snapshot.params;
  if ((params)['id_paciente']){
    this.usuarioService.createUsuario((params)['id_paciente']).subscribe(
      resp =>{
        console.log(resp);
        this.paciente = resp;
        this.edit = true;
      },  
      err => console.error(err)
    )
  }
 }

 
 saveNewPaciente(){
  delete this.paciente.id_usuario;
  this.usuarioService.createUsuario(this.paciente).subscribe(
    resp => {
        console.log(resp);
        this.router.navigate(['/perfil-paciente']);
      },
    err => console.log(err)
  );
 }

/* updatePaciente(){
  let number : number = Number(this.paciente.id_usuario);
  console.log(this.paciente);
this.usuarioService.updateUsuario(number, this.paciente).subscribe(
    resp => {
      console.log('Paciente actualizado',resp)
      this.router.navigate(['/perfil-paciente'])
    },
    err=> console.error('Error al actualizar el paciente',err)
  ) 
  } */
}

