import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTestProfComponent } from './gestion-test-prof.component';

describe('GestionTestProfComponent', () => {
  let component: GestionTestProfComponent;
  let fixture: ComponentFixture<GestionTestProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTestProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTestProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
