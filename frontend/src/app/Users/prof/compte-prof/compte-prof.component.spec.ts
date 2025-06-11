import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteProfComponent } from './compte-prof.component';

describe('CompteProfComponent', () => {
  let component: CompteProfComponent;
  let fixture: ComponentFixture<CompteProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
