import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorMesasComponentComponent } from './interior-mesas-component.component';

describe('InteriorMesasComponentComponent', () => {
  let component: InteriorMesasComponentComponent;
  let fixture: ComponentFixture<InteriorMesasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteriorMesasComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteriorMesasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
