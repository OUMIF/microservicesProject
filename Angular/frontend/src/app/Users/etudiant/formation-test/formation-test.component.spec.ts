import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationTestComponent } from './formation-test.component';

describe('FormationTestComponent', () => {
  let component: FormationTestComponent;
  let fixture: ComponentFixture<FormationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
