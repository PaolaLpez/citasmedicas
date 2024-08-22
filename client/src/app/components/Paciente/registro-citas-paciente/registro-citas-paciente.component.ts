import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CitaService} from '../../../services/cita.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Especialidad } from '../../../models/especialidad';
import { Usuario } from '../../../models/usuario';
import { Cita } from '../../../models/cita';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro-citas-paciente',
  templateUrl: './registro-citas-paciente.component.html',
  styleUrl: './registro-citas-paciente.component.css'
})
export class RegistroCitasPacienteComponent {

  especialidades: any[] = [];
  doctores: Usuario[] = [];
  selectedTipoDoctor: string = '';
  selectedDoctor: number = 0;
  cita: Cita = {
    id_paciente: 0,
    id_doctor: 0,
    nombre_especialidad: '',
    nombre_doc: '',
    nom_paciente: '',
    fecha: new Date(),
    hora: ''
  };

  constructor(private usuarioService : UsuarioService,
              private citaService : CitaService,
              private especialidadService : EspecialidadService,
              private cdr: ChangeDetectorRef,
    private router :Router,
    private activatedRoute : ActivatedRoute
)  {}

ngOnInit(){
  this.getEspecialidades();
}

getEspecialidades(): void {
  this.especialidadService.getEspecialidades().subscribe(
    (especialidades: any[]) => {
      console.log('especialidades:', especialidades)
      this.especialidades = especialidades;
    },
    err => console.error(err)
  );
}

onTipoDoctorChange(event: any): void {
  const id_especialidad = event.target.value;
  this.usuarioService.getDoctoresByEspecialidad(id_especialidad).subscribe(
    (doctores: Usuario[]) => {
      if (Array.isArray(doctores)) {
        this.doctores = doctores;
      } else {
        console.error('Respuesta inesperada:', doctores);
        this.doctores = [];
      }
    },
    err => console.error(err)
  );
}


registrarCita(): void {
  this.cita.id_doctor = this.selectedDoctor;
  this.cita.nombre_especialidad = this.especialidades.find(especialidad => especialidad.id_especialidad == this.selectedTipoDoctor)?.nombre_especialidad || '';
  this.cita.nombre_doc = this.doctores.find(doctores => doctores.id_usuario == this.selectedDoctor)?.nombre || '';
  this.cita.nom_paciente = ''; // O el valor correcto si es necesario

  this.citaService.createCita(this.cita).subscribe(
    res => {
      console.log('Cita registrada:', res);
      this.router.navigate(['/inicio-paciente']);
    },
    err => console.error(err)
  );
}

}


