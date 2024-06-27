import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';

const routes: Routes = [

  {
    path : '',
    redirectTo : '/inicio',
    pathMatch : 'full'
  },
  {
    path : '/cita',
    component : RegistroCitaComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
