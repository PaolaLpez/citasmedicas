import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel-paciente',
  templateUrl: './panel-paciente.component.html',
  styleUrls: ['./panel-paciente.component.css']
})
export class PanelPacienteComponent implements OnInit {
  id_usuario: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura el ID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.id_usuario = params['id'];  // Captura el ID del usuario de la URL
    });
  }
}
