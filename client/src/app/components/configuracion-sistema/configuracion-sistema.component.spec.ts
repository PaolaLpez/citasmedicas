import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSistemaComponent } from './configuracion-sistema.component';

describe('ConfiguracionSistemaComponent', () => {
  let component: ConfiguracionSistemaComponent;
  let fixture: ComponentFixture<ConfiguracionSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
