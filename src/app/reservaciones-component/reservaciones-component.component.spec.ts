import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionesComponentComponent } from './reservaciones-component.component';

describe('ReservacionesComponentComponent', () => {
  let component: ReservacionesComponentComponent;
  let fixture: ComponentFixture<ReservacionesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservacionesComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservacionesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
