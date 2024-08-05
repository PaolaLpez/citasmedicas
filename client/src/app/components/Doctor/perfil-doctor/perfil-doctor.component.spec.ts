import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDoctorComponent } from './perfil-doctor.component';

describe('PerfilDoctorComponent', () => {
  let component: PerfilDoctorComponent;
  let fixture: ComponentFixture<PerfilDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
