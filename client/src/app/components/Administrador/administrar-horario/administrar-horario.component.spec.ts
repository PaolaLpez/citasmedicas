import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarHorarioComponent } from './administrar-horario.component';

describe('AdministrarHorarioComponent', () => {
  let component: AdministrarHorarioComponent;
  let fixture: ComponentFixture<AdministrarHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrarHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
