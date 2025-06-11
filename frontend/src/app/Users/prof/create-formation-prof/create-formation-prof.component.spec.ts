import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationProfComponent } from './create-formation-prof.component';

describe('CreateFormationProfComponent', () => {
  let component: CreateFormationProfComponent;
  let fixture: ComponentFixture<CreateFormationProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormationProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormationProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
