import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDoctoresComponent } from './administrar-doctores.component';

describe('AdministrarDoctoresComponent', () => {
  let component: AdministrarDoctoresComponent;
  let fixture: ComponentFixture<AdministrarDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrarDoctoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
