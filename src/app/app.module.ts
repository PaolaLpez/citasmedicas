import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguracionSistemaComponent } from './components/configuracion-sistema/configuracion-sistema.component';
import { HistorialPacienteComponent } from './components/historial-paciente/historial-paciente.component';
import { InformacionPacienteComponent } from './components/informacion-paciente/informacion-paciente.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { RegistroCitaMedicasComponent } from './components/registro-cita-medicas/registro-cita-medicas.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionSistemaComponent,
    HistorialPacienteComponent,
    InformacionPacienteComponent,
    IngresoComponent,
    InicioComponent,
    RecordatoriosComponent,
    RegistroCitaComponent,
    RegistroCitaMedicasComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
