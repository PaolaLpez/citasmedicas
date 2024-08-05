import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDoctorComponent } from './inicio-doctor.component';

describe('InicioDoctorComponent', () => {
  let component: InicioDoctorComponent;
  let fixture: ComponentFixture<InicioDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
