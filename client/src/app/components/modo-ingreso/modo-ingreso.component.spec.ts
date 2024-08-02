import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoIngresoComponent } from './modo-ingreso.component';

describe('ModoIngresoComponent', () => {
  let component: ModoIngresoComponent;
  let fixture: ComponentFixture<ModoIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModoIngresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModoIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
