import { Component, OnInit, HostBinding} from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-inicio-paciente',
  templateUrl: './inicio-paciente.component.html',
  styleUrl: './inicio-paciente.component.css'
})
export class InicioPacienteComponent {

  constructor(private usuarioService : UsuarioService, 
    private router :Router,
    private activatedRoute : ActivatedRoute,
    private citaService: CitaService
  ){}

  citas: Cita[] = []; // Array para almacenar las citas del paciente
  usuario : any = [];

  ngOnInit(){ 
    this.getUsuario();
    this.loadCitas(); // Asegúrate de cargar las citas cuando el componente se inicializa
  }
  
  getUsuario(){
    const params = this.activatedRoute.snapshot.params;
    if ((params)['id']){
      this.usuarioService.getOneUsuario((params)['id']).subscribe(
        resp =>{
          console.log(resp);
          this.usuario = resp;
        },  
        err => console.error(err)
      )
    }
   }

   loadCitas(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.citaService.getCitasByPaciente(params['id']).subscribe(
        (res: Cita[]) => {
          this.citas = res;
        },
        err => console.error(err)
      );
    }
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
