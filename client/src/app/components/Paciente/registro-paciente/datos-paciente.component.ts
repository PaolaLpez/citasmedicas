import { Component, OnInit, HostBinding } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrl: './datos-paciente.component.css'
})
export class DatosPacienteComponent {

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
  this.saveNewPaciente();
 }
saveNewPaciente(){
  delete this.paciente.id_paciente;
  console.log(this.paciente);
  this.pacienteService.createPaciente(this.paciente).subscribe(
    resp => {
      console.log('Paciente creado',resp)
      this.router.navigate(['/inicio-paciente'])
    },
    err=> console.error('Error al crear el paciente',err)
  )
   
  }
}

