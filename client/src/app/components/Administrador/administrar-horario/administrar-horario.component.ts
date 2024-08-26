import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrar-horario',
  templateUrl: './administrar-horario.component.html',
  styleUrl: './administrar-horario.component.css'
})
export class AdministrarHorarioComponent {
horario: any;
horas: any;
minutos: any;
dias: any;
meses: any;
anos: any;
onSubmit(_t18: NgForm) {
throw new Error('Method not implemented.');
}

}
