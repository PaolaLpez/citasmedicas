import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitaMedicasComponent } from './registro-cita-medicas.component';

describe('RegistroCitaMedicasComponent', () => {
  let component: RegistroCitaMedicasComponent;
  let fixture: ComponentFixture<RegistroCitaMedicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCitaMedicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCitaMedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
