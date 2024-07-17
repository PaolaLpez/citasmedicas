import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { RegistroCitaMedicasComponent } from './components/registro-cita-medicas/registro-cita-medicas.component';
import { ConfiguracionSistemaComponent } from './components/configuracion-sistema/configuracion-sistema.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HistorialPacienteComponent } from './components/horarios/historial-paciente.component';
import { HistorialComponent } from './components/historial/historial.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DatosPacienteComponent } from './components/datos-paciente/datos-paciente.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [

  {
    path : '',
    redirectTo : '/registro-usuario',
    pathMatch : 'full'
  },
  {
    path : 'inicio',
    component : InicioComponent
  },
  {
    path : 'cita',
    component : RegistroCitaComponent
  },
  {
    path : 'registro-cita-medicas',
    component : RegistroCitaMedicasComponent
  },
  {
    path : 'configuracion-sistema',
    component : ConfiguracionSistemaComponent
  },
  {
    path : 'recordatorios',
    component : RecordatoriosComponent
  },
  {
    path : 'registro-usuario',
    component : RegistroUsuarioComponent

  },
  {
    path : 'formulario',
    component : FormularioComponent
  },
  {
  path : 'historial-paciente',
    component : HistorialPacienteComponent
  },
  {
    path : 'historial',
    component : HistorialComponent
  },
  {
    path : 'registro-cita',
    component : RegistroCitaComponent
  },
  {
    path : 'ingreso',
    component : IngresoComponent
  },
  {
    path : 'perfil',
    component : PerfilComponent
  },
  {
    path : 'datos-paciente',
    component : DatosPacienteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
