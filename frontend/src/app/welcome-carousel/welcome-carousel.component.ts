import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome-carousel',
  imports: [CommonModule],
  templateUrl: './welcome-carousel.component.html',
  styleUrl: './welcome-carousel.component.css'
})
export class WelcomeCarouselComponent {
  letters = ['H', 'E', 'Y', 'Y', 'A', '!'];
/*   currentIndex = 0;

  goToSlide(index: number) {
    this.currentIndex = index;
  } */

    triggerAnimation(container: HTMLElement) {
      container.classList.remove('animate');
      setTimeout(() => {
        container.classList.add('animate');
      }, 500);
    }
}
