import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReservacionComponentComponent } from './form-reservacion-component.component';

describe('FormReservacionComponentComponent', () => {
  let component: FormReservacionComponentComponent;
  let fixture: ComponentFixture<FormReservacionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReservacionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReservacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
