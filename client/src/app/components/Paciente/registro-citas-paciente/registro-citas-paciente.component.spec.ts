import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitasPacienteComponent } from './registro-citas-paciente.component';

describe('RegistroCitasPacienteComponent', () => {
  let component: RegistroCitasPacienteComponent;
  let fixture: ComponentFixture<RegistroCitasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCitasPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCitasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
