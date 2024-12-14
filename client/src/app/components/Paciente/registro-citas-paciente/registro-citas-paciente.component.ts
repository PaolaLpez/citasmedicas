import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Cita } from '../../../models/cita';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-registro-citas-paciente',
  templateUrl: './registro-citas-paciente.component.html',
  styleUrls: ['./registro-citas-paciente.component.css']
})
export class RegistroCitasPacienteComponent implements OnInit {
  horasDisponibles: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];
  
  especialidades: any[] = [
    { id_especialidad: 1, nombre_especialidad: 'Médico General' },
    { id_especialidad: 2, nombre_especialidad: 'Dentista' },
    { id_especialidad: 3, nombre_especialidad: 'Nutriólogo' },
    { id_especialidad: 4, nombre_especialidad: 'Psicólogo' }
  ];

  doctores: Usuario[] = [];
  todosDoctores: Usuario[] = [
    { id_usuario: 1, nombre: 'Dr. Juan Pérez', id_especialidad: 1, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 2, nombre: 'Dr. María Gómez', id_especialidad: 1, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 3, nombre: 'Dr. Luis Rodríguez', id_especialidad: 2, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 4, nombre: 'Dra. Ana Martínez', id_especialidad: 2, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 5, nombre: 'Lic. Ana López', id_especialidad: 3, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 6, nombre: 'Lic. Carlos Ruiz', id_especialidad: 3, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 7, nombre: 'Dr. José Martínez', id_especialidad: 4, id_rol: 0, correo_electronico: '', contrasena: '' },
    { id_usuario: 8, nombre: 'Dra. Laura Fernández', id_especialidad: 4, id_rol: 0, correo_electronico: '', contrasena: '' }
  ];

  selectedTipoDoctor: number = 0;
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
  showConfirmationMessage: boolean = false;
  successMessage: string = '';
minDate: any;
maxDate: any;

  constructor(
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private especialidadService: EspecialidadService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPacienteInfo();
  }

  onTipoDoctorChange(event: any): void {
    const id_especialidad = Number(event.target.value);  // Convertimos a número para comparación

    if (id_especialidad) {
      this.doctores = this.todosDoctores.filter(doctor => doctor.id_especialidad === id_especialidad);
    } else {
      this.doctores = [];
    }
    this.cdr.detectChanges();
  }

  getPacienteInfo(): void {
    const pacienteId = 1;  // Aquí debes colocar el ID del paciente autenticado
    this.usuarioService.getPacienteId(pacienteId).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.cita.id_paciente = data[0].id_usuario;
          this.cita.nom_paciente = data[0].nombre; // Asegúrate de que este campo está disponible
        }
      },
      err => console.error(err)
    );
  }

  registrarCita() {
    if (this.selectedTipoDoctor && this.selectedDoctor && this.cita.fecha && this.cita.hora) {
      // Asignar valores a la cita
      this.cita.nombre_especialidad = this.especialidades.find(e => e.id_especialidad === this.selectedTipoDoctor)?.nombre_especialidad || '';
      this.cita.nombre_doc = this.doctores.find(d => d.id_usuario === this.selectedDoctor)?.nombre || '';
      this.cita.id_doctor = this.selectedDoctor;

      // Registrar la cita usando el servicio
      this.citaService.createCita(this.cita).subscribe(
        (response: any) => {
          console.log('Cita registrada:', response);
          this.successMessage = 'Cita registrada correctamente';
          this.showConfirmationMessage = true;
          setTimeout(() => this.showConfirmationMessage = false, 3000); // Ocultar mensaje después de 3 segundos
          this.clearForm();
        },
        (error: any) => {
          console.error('Error al registrar la cita:', error);
        }
      );
    } else {
      console.log('Por favor complete todos los campos.');
    }
  }

  irInicio() {
    this.router.navigate(['/inicio-paciente']);
  }

  clearForm() {
    this.selectedTipoDoctor = 0;
    this.selectedDoctor = 0;
    this.cita = {
      id_paciente: 0,
      id_doctor: 0,
      nombre_especialidad: '',
      nombre_doc: '',
      nom_paciente: '',
      fecha: new Date(),
      hora: ''
    };
    this.doctores = [];
  }
}
