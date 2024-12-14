import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPacienteComponent } from './perfil-paciente.component';

describe('PerfilPacienteComponent', () => {
  let component: PerfilPacienteComponent;
  let fixture: ComponentFixture<PerfilPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
