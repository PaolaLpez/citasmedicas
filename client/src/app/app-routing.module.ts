import { RecursiveVisitor } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


//componentes de pantalla de inicio
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { DatosPacienteComponent } from "./components/Paciente/registro-paciente/datos-paciente.component";


//Componentes del administrador
import { InicioAdministradorComponent } from "./components/Administrador/inicio-administrador/inicio-administrador.component";
import { AdministrarHorarioComponent } from "./components/Administrador/administrar-horario/administrar-horario.component";
import { AdministrarDoctoresComponent } from './components/Administrador/administrar-doctores/administrar-doctores.component';
import { VerDoctoresComponent } from './components/Administrador/ver-doctores/ver-doctores.component';

// Componentes del doctor
import { PanelDoctorComponent } from "./components/Doctor/panel-doctor/panel-doctor.component";
import { PerfilDoctorComponent } from "./components/Doctor/perfil-doctor/perfil-doctor.component";
import { InicioDoctorComponent } from "./components/Doctor/inicio-doctor/inicio-doctor.component";
import { PanelAdministradorComponent } from "./components/Administrador/panel-administrador/panel-administrador.component";
import { RegistroCitaComponent } from "./components/Doctor/registro-cita/registro-cita.component";


//Componentes del paciente
import { PanelPacienteComponent } from "./components/Paciente/panel-paciente/panel-paciente.component";
import { PerfilPacienteComponent } from "./components/Paciente/perfil-paciente/perfil-paciente.component";
import { RegistroCitasPacienteComponent } from "./components/Paciente/registro-citas-paciente/registro-citas-paciente.component";
import { InicioPacienteComponent } from "./components/Paciente/inicio-paciente/inicio-paciente.component";
import { EdicionDatosComponent } from "./components/Paciente/edicion-datos/edicion-datos.component";


//componentes extras (no se si se ocuparan o no)
import { RecordatoriosComponent } from "./components/recordatorios/recordatorios.component";
import { FormularioComponent } from "./components/formulario/formulario.component";


const routes: Routes = [

//Pantalla de inicio
{ path : '', redirectTo : '/inicio', pathMatch : 'full' },
{ path : 'inicio', component : InicioComponent }, 
//{path: '**', component : InicioComponent,}, //Esta es por si ningua de las otras rutas coinicide

//Para el login
   { path : 'login', component : LoginComponent },

//Para el registro del paciente:
{ path : 'registro-paciente', component : DatosPacienteComponent },

  //Ruteo administrador
  { path : 'inicio-administrador', component : InicioAdministradorComponent },
  { path : 'administrar-horario', component : AdministrarHorarioComponent },
  { path : 'panel-administrador', component : PanelAdministradorComponent },
  { path : 'administrar-doctores', component : AdministrarDoctoresComponent },
  { path : 'ver-doctores', component : VerDoctoresComponent },

   //Ruteo doctor
   { path : 'panel-doctor', component : PanelDoctorComponent },
   { path : 'perfil-doctor/:id', component : PerfilDoctorComponent },
   { path : 'inicio-doctor/:id', component : InicioDoctorComponent },
   { path : 'registro-cita/:id', component : RegistroCitaComponent },


   //Ruteo paciente
    {path : 'panel-paciente',component : PanelPacienteComponent },
    { path : 'registro-citas-paciente/:id', component :  RegistroCitasPacienteComponent },
    { path : 'edicion-datos', component : EdicionDatosComponent },
    { path : 'inicio-paciente/:id', component : InicioPacienteComponent },
    { path : 'perfil-paciente/:id', component : PerfilPacienteComponent },



    { path : 'cita', component : RegistroCitaComponent },

    { path : 'recordatorios', component : RecordatoriosComponent },
      
    { path : 'formulario', component : FormularioComponent },



      ];  

      @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }
  