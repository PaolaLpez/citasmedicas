import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitaComponent } from './registro-cita.component';

describe('RegistroCitaComponent', () => {
  let component: RegistroCitaComponent;
  let fixture: ComponentFixture<RegistroCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
