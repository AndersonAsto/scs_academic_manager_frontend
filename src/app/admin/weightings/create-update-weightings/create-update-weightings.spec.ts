import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWeightings } from './create-update-weightings';

describe('CreateUpdateWeightings', () => {
  let component: CreateUpdateWeightings;
  let fixture: ComponentFixture<CreateUpdateWeightings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateWeightings],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUpdateWeightings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
