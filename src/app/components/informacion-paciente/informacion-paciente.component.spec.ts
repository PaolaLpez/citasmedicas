import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPacienteComponent } from './informacion-paciente.component';

describe('InformacionPacienteComponent', () => {
  let component: InformacionPacienteComponent;
  let fixture: ComponentFixture<InformacionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
