import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CitaService} from '../../../services/cita.service';
import { DoctorService } from '../../../services/doctor.service';
import { especialidadService } from '../../../services/especialidad.service';
import { Especialidad } from '../../../models/especialidad';
import { Doctor } from '../../../models/doctor';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-registro-citas-paciente',
  templateUrl: './registro-citas-paciente.component.html',
  styleUrl: './registro-citas-paciente.component.css'
})
export class RegistroCitasPacienteComponent {

  especialidades: any[] = [];
  doctores: Doctor[] = [];
  selectedTipoDoctor: string = '';
  selectedDoctor: number = 0;
  cita: Cita = {
    id_paciente: 0,
    id_doctor: 0,
    nombre_especialidad: '',
    nombre_doc: '',
    fecha: new Date(),
    hora: new Date()
  };

  constructor(private doctorService : DoctorService,
              private citaService : CitaService,
              private especialidadService : especialidadService,
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
  this.doctorService.getDoctoresByEspecialidad(id_especialidad).subscribe(
    (doctores: Doctor[]) => {
      this.doctores = doctores;
    },
    err => console.error(err)
  );
}

registrarCita(): void {
  this.cita.id_doctor = this.selectedDoctor;
  this.cita.nombre_especialidad = this.especialidades.find(especialidad => especialidad.id_especialidad == this.selectedTipoDoctor)?.nombre_especialidad || '';
  this.cita.nombre_doc = this.doctores.find(doctor => doctor.id_doctor == this.selectedDoctor)?.nombre_doc || '';

  this.citaService.createCita(this.cita).subscribe(
    res => {
      console.log('Cita registrada:', res);
      this.router.navigate(['/ingreso']);
    },
    err => console.error(err)
  );
}




}
