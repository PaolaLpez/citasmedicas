import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';


@Component({
  selector: 'app-inicio-doctor',
  templateUrl: './inicio-doctor.component.html',
  styleUrls: ['./inicio-doctor.component.css']
})
export class InicioDoctorComponent implements OnInit {


  citas: Cita[] = []; // Array para almacenar las citas del doctor


  constructor(private citaService: CitaService) { }


  ngOnInit(): void {
    this.loadCitas(); // Cargar citas cuando el componente se inicializa
  }


  loadCitas(): void {
    this.citaService.getCitas().subscribe(
      (res: Cita[]) => {
        this.citas = res;
      },
      err => console.error(err)
    );
  }


  cancelarCita(id_cita: number | undefined): void {
    if (id_cita === undefined) {
      console.error('El ID de la cita es undefined.');
      return;
    }


    if (confirm('¿Está seguro de que desea cancelar la cita?')) {
      this.citaService.deleteCita(id_cita).subscribe(
        res => {
          this.citas = this.citas.filter(cita => cita.id_cita !== id_cita);
          alert('Cita cancelada.');
        },
        err => console.error(err)
      );
    }
  }


}
