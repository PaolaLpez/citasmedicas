import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguracionSistemaComponent } from './components/configuracion-sistema/configuracion-sistema.component';
import { HistorialPacienteComponent } from './components/horarios/historial-paciente.component';
import { InformacionPacienteComponent } from './components/informacion-paciente/informacion-paciente.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { RegistroCitaMedicasComponent } from './components/registro-cita-medicas/registro-cita-medicas.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HistorialComponent } from './components/historial/historial.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DatosPacienteComponent } from './components/datos-paciente/datos-paciente.component';
import { ModoIngresoComponent } from './components/modo-ingreso/modo-ingreso.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { IngresoAdminComponent } from './components/ingreso-admin/ingreso-admin.component';
import { PerfilDoctorComponent } from './components/perfil-doctor/perfil-doctor.component';

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
    RegistroUsuarioComponent,
    FormularioComponent,
    HistorialComponent,
    PerfilComponent,
    DatosPacienteComponent,
    ModoIngresoComponent,
    LoginAdminComponent,
    IngresoAdminComponent,
    PerfilDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
