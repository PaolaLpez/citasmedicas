import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Usuario } from '../../../models/usuario';
import { Cita } from '../../../models/cita';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro-citas-paciente',
  templateUrl: './registro-citas-paciente.component.html',
  styleUrls: ['./registro-citas-paciente.component.css']
})
export class RegistroCitasPacienteComponent implements OnInit {
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

  constructor(
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private especialidadService: EspecialidadService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEspecialidades();
    this.getPacienteInfo(); // Obtiene la información del paciente
  }

  getEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe(
      (especialidades: any[]) => {
        this.especialidades = especialidades;
      },
      err => console.error(err)
    );
  }

  onTipoDoctorChange(event: any): void {
    const id_especialidad = event.target.value;
    this.usuarioService.getDoctoresByEspecialidad(id_especialidad).subscribe(
      (doctores: Usuario[]) => {
        this.doctores = doctores;
        this.cdr.detectChanges(); // Detecta cambios para actualizar la vista
      },
      err => console.error(err)
    );
  }

  getPacienteInfo(): void {
    const pacienteId = 1; // Aquí debes colocar el ID del paciente autenticado
    this.usuarioService.getPacienteId(pacienteId).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.cita.id_paciente = data[0].id_usuario;
        }
      },
      err => console.error(err)
    );

    this.usuarioService.getPacienteNombre(pacienteId).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.cita.nom_paciente = data[0].nombre;
        }
      },
      err => console.error(err)
    );
  }

  registrarCita(): void {
    if (!this.selectedTipoDoctor || !this.selectedDoctor) {
      console.error('Debe seleccionar un tipo de doctor y un doctor');
      return;
    }
    
    this.cita.id_doctor = this.selectedDoctor;
    this.cita.nombre_especialidad = this.especialidades.find(especialidad => especialidad.id_especialidad == this.selectedTipoDoctor)?.nombre_especialidad || '';
    this.cita.nombre_doc = this.doctores.find(doctor => doctor.id_usuario == this.selectedDoctor)?.nombre || '';
  
    console.log('Datos de cita:', this.cita); // Verifica los datos antes de enviarlos

    this.citaService.createCita(this.cita).subscribe(
      res => {
        console.log('Cita registrada:', res);
        this.router.navigate(['/inicio-paciente']);
      },
      err => console.error(err)
    );
  }
}
