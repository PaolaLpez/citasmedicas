import { Component, OnInit, HostBinding } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrl: './perfil-paciente.component.css'
})
export class PerfilPacienteComponent {

  @HostBinding('class') classes='row';
  paciente : Paciente = {
    id_rol:3 ,
    nom_paciente: '',
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

constructor(private pacienteService : PacienteService,
            private router :Router,
            private activatedRoute : ActivatedRoute
)  {}

ngOnInit(){
  const params = this.activatedRoute.snapshot.params;
  if ((params)['id_paciente']){
    this.pacienteService.getOnePaciente((params)['id_paciente']).subscribe(
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
  delete this.paciente.id_paciente;
  this.pacienteService.createPaciente(this.paciente).subscribe(
    resp => {
        console.log(resp);
        this.router.navigate(['/perfil-paciente']);
      },
    err => console.log(err)
  );
 }

updatePaciente(){
  let number : number = Number(this.paciente.id_paciente);
  console.log(this.paciente);
this.pacienteService.updatePaciente(number, this.paciente).subscribe(
    resp => {
      console.log('Paciente actualizado',resp)
      this.router.navigate(['/perfil-paciente'])
    },
    err=> console.error('Error al actualizar el paciente',err)
  )
   
  }
}

