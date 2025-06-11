import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestProfComponent } from './create-test-prof.component';

describe('CreateTestProfComponent', () => {
  let component: CreateTestProfComponent;
  let fixture: ComponentFixture<CreateTestProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTestProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
