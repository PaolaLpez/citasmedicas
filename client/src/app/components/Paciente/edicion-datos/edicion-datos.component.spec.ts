import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionDatosComponent } from './edicion-datos.component';

describe('EdicionDatosComponent', () => {
  let component: EdicionDatosComponent;
  let fixture: ComponentFixture<EdicionDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdicionDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
