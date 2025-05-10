import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.css'
})
export class TestDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  test: any;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    //this.test = this.testService.getTestById(id);
  }

  goBack() {
    this.router.navigate(['/tests']);
  }
}
