import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrar-doctores',
  templateUrl: './administrar-doctores.component.html',
  styleUrls: ['./administrar-doctores.component.css']
})
export class AdministrarDoctoresComponent implements OnInit {
  doctor: any = {
    nombre: '',
    id_especialidad: '',
    id_horario: '',
    correo_electronico: '',
    contrasena: ''
  };
  especialidades: any[] = [];
  horarios: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEspecialidades();
    this.loadHorarios();
  }

  // Método para cargar especialidades desde la API
  loadEspecialidades(): void {
    this.http.get<any[]>('http://localhost:3000/api/especialidad').subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  // Método para cargar horarios desde la API
  loadHorarios(): void {
    this.http.get<any[]>('http://localhost:3000/api/horario').subscribe(
      (data) => {
        this.horarios = data;
      },
      (error) => {
        console.error('Error al cargar horarios', error);
      }
    );
  }

  // Método para enviar el formulario
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Aquí debes enviar los datos a la API para agregar el doctor
      this.http.post('http://localhost:3000/api/usuario', this.doctor).subscribe(
        (response: any) => {
          this.successMessage = 'Doctor registrado exitosamente.';
          this.errorMessage = '';
          form.resetForm(); // Limpiar el formulario
        },
        (error) => {
          console.error('Error al registrar el doctor', error);
          this.successMessage = '';
          this.errorMessage = 'No se pudo registrar el doctor. Intente nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
