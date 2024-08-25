import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css']
})
export class RegistroCitaComponent implements OnInit {
  horasDisponibles: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00',
    '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  especialidades = [
    { id_especialidad: '1', nombre_especialidad: 'Médico General' },
    { id_especialidad: '2', nombre_especialidad: 'Dentista' },
    { id_especialidad: '3', nombre_especialidad: 'Nutriólogo' },
    { id_especialidad: '4', nombre_especialidad: 'Psicólogo' }
  ];

  doctores = [
    { id_usuario: '1', nombre: 'Dr. Juan Pérez' },
    { id_usuario: '2', nombre: 'Dra. María López' },
    { id_usuario: '3', nombre: 'Dr. José Hernández' },
    { id_usuario: '4', nombre: 'Dra. Ana García' },
    { id_usuario: '5', nombre: 'Dr. Carlos Martínez' },
    { id_usuario: '6', nombre: 'Dra. Laura Rodríguez' },
    { id_usuario: '7', nombre: 'Dr. Miguel Gómez' },
    { id_usuario: '8', nombre: 'Dra. Sofía Díaz' }
  ];

  selectedTipoDoctor: string = '';
  selectedDoctor: string = '';

  cita = {
    id_paciente: 0,
    id_doctor: 0,
    nombre_especialidad: '',
    nombre_doc: '',
    nom_paciente: '',
    fecha: new Date(),
    hora: ''
  };

  mensaje: any;
  successMessage: string = '';

  ngOnInit(): void {}

  registrarCita() {
    if (this.selectedTipoDoctor && this.selectedDoctor && this.cita.fecha && this.cita.hora) {
      // Assign additional fields for registration
      this.cita.nombre_especialidad = this.selectedTipoDoctor;
      this.cita.nombre_doc = this.selectedDoctor;
      // Logic to register the appointment
      console.log('Cita registrada:', this.cita);
      // Show success message
      this.successMessage = 'Cita registrada correctamente';
      // Clear the form
      this.clearForm();

      // Show the success message and hide it after 3 seconds
      const messageElement = document.querySelector('.success-message') as HTMLElement;
      if (messageElement) {
        messageElement.classList.add('visible');
        setTimeout(() => {
          messageElement.classList.remove('visible');
        }, 3000);
      }
    } else {
      // Handle validation errors if necessary
      console.log('Por favor complete todos los campos.');
    }
  }

  onTipoDoctorChange(event: any) {
    // Additional logic if necessary when the doctor type changes
    console.log('Tipo de doctor seleccionado:', event.target.value);
  }

  irInicio() {
    // Logic to redirect to the home page
    window.location.href = '/inicio-paciente';
  }

  clearForm() {
    this.selectedTipoDoctor = '';
    this.selectedDoctor = '';
    this.cita = {
      id_paciente: 0,
      id_doctor: 0,
      nombre_especialidad: '',
      nombre_doc: '',
      nom_paciente: '',
      fecha: new Date(),
      hora: ''
    };
  }
}
