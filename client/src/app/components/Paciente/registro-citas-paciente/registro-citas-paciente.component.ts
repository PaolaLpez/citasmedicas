import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Usuario } from '../../../models/usuario';
import { Cita } from '../../../models/cita';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthIDService } from '../../../services/auto-id.service';

@Component({
  selector: 'app-registro-citas-paciente',
  templateUrl: './registro-citas-paciente.component.html',
  styleUrls: ['./registro-citas-paciente.component.css']
})
export class RegistroCitasPacienteComponent implements OnInit {
  especialidades: any[] = [];
  doctores: any[] = [];
  selectedTipoDoctor: string = '';
  selectedDoctor: number = 0;
  cita: Cita = {
    id_paciente: 0,
    id_doctor: 0,
    nombre_especialidad: '',
    nombre_doc: '',
    nom_paciente: '',
    fecha: '',
    hora: ''
  };

  constructor(
    private authIDService: AuthIDService,
    private usuarioService: UsuarioService,
    private citaService: CitaService,
    private especialidadService: EspecialidadService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEspecialidades();
    this.getPacienteInfo(); // Obtiene la información del paciente autenticado
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

/* setPacienteInfo(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        this.cita.id_paciente = user.id_usuario;
        this.cita.nom_paciente = user.nombre;
        console.log('Datos del paciente:', this.cita.id_paciente, this.cita.nom_paciente);
    } else {
        console.error('No se pudo obtener la información del paciente desde localStorage');
    }
} */


    getPacienteInfo(): void {
      const pacienteIdStr = this.authIDService.getUsuarioStored();
      const pacienteId = pacienteIdStr ? parseInt(pacienteIdStr, 10) : null;
    
      if (pacienteId) {
        this.usuarioService.getPacienteId(pacienteId).subscribe(
          (data: any) => {
            if (data.length > 0) {
              this.cita.id_paciente = data[0].id_usuario;
    
              this.usuarioService.getPacienteNombre(pacienteId).subscribe(
                (nombreData: any) => {
                  this.cita.nom_paciente = nombreData.nombre || ''; // Asegúrate de asignar correctamente el nombre
                  console.log('Nombre del paciente asignado a la cita:', this.cita.nom_paciente);
                },
                err => console.error(err)
              );
            }
          },
          err => console.error(err)
        );
      } else {
        console.error('No se pudo obtener el ID del paciente');
      }
    }
    
    


registrarCita(): void {
  // Verificar que el ID del paciente y su nombre están correctamente establecidos
  if (!this.cita.id_paciente || !this.cita.nom_paciente) {
    console.error('Faltan datos del paciente. ID:', this.cita.id_paciente, 'Nombre:', this.cita.nom_paciente);
    return;
  }

  // Asegurar que la fecha esté en el formato correcto

  delete this.cita.id_cita;
  this.cita.id_doctor = this.selectedDoctor;
  this.cita.nombre_especialidad = this.especialidades.find(especialidad => especialidad.id_especialidad == this.selectedTipoDoctor)?.nombre_especialidad || '';
  this.cita.nombre_doc = this.doctores.find(doctor => doctor.id_usuario == this.selectedDoctor)?.nombre || '';
  this.cita.fecha = new Date(this.cita.fecha).toISOString().split('T')[0];

  console.log('Datos de cita:', this.cita); // Verifica los datos antes de enviarlos

  this.citaService.createCita(this.cita).subscribe(
    res => {
      console.log('Cita registrada:', res);
      this.router.navigate(['/inicio-paciente/:id']);
    },
    err => console.error(err)
  );
}

}
