import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPacienteComponent } from './panel-paciente.component';

describe('PanelPacienteComponent', () => {
  let component: PanelPacienteComponent;
  let fixture: ComponentFixture<PanelPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
