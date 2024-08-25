import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel-doctor',
  templateUrl: './panel-doctor.component.html',
  styleUrl: './panel-doctor.component.css'
})
export class PanelDoctorComponent {
  id_usuario: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura el ID de la URL
    this.activatedRoute.params.subscribe(params => {
      this.id_usuario = params['id'];  // Captura el ID del usuario de la URL
    });
  }
}
