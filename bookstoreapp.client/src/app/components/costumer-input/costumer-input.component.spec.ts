import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerInputComponent } from './costumer-input.component';

describe('CostumerInputComponent', () => {
  let component: CostumerInputComponent;
  let fixture: ComponentFixture<CostumerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostumerInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
