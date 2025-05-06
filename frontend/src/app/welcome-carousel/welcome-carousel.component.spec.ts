import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { WelcomeCarouselComponent } from './welcome-carousel.component';

describe('WelcomeCarouselComponent', () => {
  let component: WelcomeCarouselComponent;
  let fixture: ComponentFixture<WelcomeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
