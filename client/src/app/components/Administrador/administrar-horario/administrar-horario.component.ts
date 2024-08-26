import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrar-horario',
  templateUrl: './administrar-horario.component.html',
  styleUrls: ['./administrar-horario.component.css']
})
export class AdministrarHorarioComponent implements OnInit {
  horario = {
    doctor: '',
    horaDesdeHora: '',
    horaDesdeMinuto: '',
    horaHastaHora: '',
    horaHastaMinuto: '',
    diaInicio: '',
    mesInicio: '',
    anioInicio: '',
    diaFin: '',
    mesFin: '',
    anioFin: ''
  };
  horas = Array.from({ length: 24 }, (_, i) => i);
  minutos = Array.from({ length: 60 }, (_, i) => i);
  dias = Array.from({ length: 31 }, (_, i) => i + 1);
  meses = [
    { value: 1, nombre: 'Enero' },
    { value: 2, nombre: 'Febrero' },
    { value: 3, nombre: 'Marzo' },
    { value: 4, nombre: 'Abril' },
    { value: 5, nombre: 'Mayo' },
    { value: 6, nombre: 'Junio' },
    { value: 7, nombre: 'Julio' },
    { value: 8, nombre: 'Agosto' },
    { value: 9, nombre: 'Septiembre' },
    { value: 10, nombre: 'Octubre' },
    { value: 11, nombre: 'Noviembre' },
    { value: 12, nombre: 'Diciembre' }
  ];
  anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
doctores: any;

  ngOnInit() {
    // Puedes cargar datos iniciales aquí si es necesario
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado', this.horario);
      // Implementa la lógica para enviar los datos del formulario
    }
  }
}
