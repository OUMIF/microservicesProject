import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

interface Course {
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  school: string;
  category: string;
  category2: string;
  certificatePrice: string;
  programDates: string;
  itemId: string;
}

@Component({
  selector: 'app-formation-test',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './formation-test.component.html',
  styleUrl: './formation-test.component.css'
})
export class FormationTestComponent implements OnInit {
  course: Course | undefined;
  mayOfferDetails: any;
  augustOfferDetails: any;
  
  // Ajoutez une liste de cours pour pouvoir récupérer un cours par son ID
  courses = [
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/1.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Data Science for Business',
      tagline: 'Move beyond the spreadsheet',
      description: '<p>Designed for managers, this course provides a hands-on approach for demystifying the data science ecosystem and making you a more conscientious.</p>',
      imageUrl: 'assets/2.jpg',
      school: 'Harvard Business School',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '1600, 1600',
      programDates: 'Jun 11, 2025 - Jul 09, 2025, Sep 24, 2025 - Oct 22, 2025',
      itemId: '98160cc0-5769-4b63-a7b3-01d150d36b13'
    },
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy, and ethics.</p>',
      imageUrl: 'assets/3.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Data Science for Business',
      tagline: 'Move beyond the spreadsheet',
      description: '<p>Designed for managers, this course provides a hands-on approach for demystifying the data science ecosystem and making you a more conscientious.</p>',
      imageUrl: 'assets/4.jpg',
      school: 'Harvard Business School',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '1600, 1600',
      programDates: 'Jun 11, 2025 - Jul 09, 2025, Sep 24, 2025 - Oct 22, 2025',
      itemId: '98160cc0-5769-4b63-a7b3-01d150d36b13'
    },
    {
      title: 'Data Science Principles',
      tagline: 'Are you prepared for our data-driven world?',
      description: '<p>Data Science Principles gives you an overview of data science with a code- and math-free introduction to prediction, causality, data wrangling, privacy.</p>',
      imageUrl: 'assets/5.jpg',
      school: 'Harvard Faculty of Arts & Sciences',
      category: 'Business',
      category2: 'Data Science',
      certificatePrice: '950, 950',
      programDates: 'May 28, 2025 - Jun 25, 2025, Aug 27, 2025 - Sep 24, 2025',
      itemId: '1f5f67c1-45e8-451a-bda4-de4b2571571c'
    },
    {
      title: 'Open Innovation',
      tagline: 'Solve your organization’s problems by looking outside your organization',
      description: '<p>Open innovation is a strategy that suggests the best ideas, solutions, and people necessary to solve your organization’s difficult problems may come ;</p>',
      imageUrl: 'https://www.harvardonline.harvard.edu/sites/default/files/styles/teaser/public/2022-01/078916028-crowd-people-walking-street.jpeg.webp?itok=_EK-25lu',
      school: 'Harvard Business School',
      category: 'Business',
      category2: '',
      certificatePrice: '950, 950',
      programDates: 'Jun 18, 2025 - Jul 30, 2025, Aug 27, 2025 - Oct 08, 2025',
      itemId: 'db7d6b76-d3d9-4657-b2fd-19f96ed507d2'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Première tentative: récupérer du state de navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['course']) {
      this.course = navigation.extras.state['course'];
      this.processCourseData();
    } else {
      // Deuxième tentative: récupérer par ID dans l'URL
      const courseId = this.route.snapshot.paramMap.get('id');
      if (courseId) {
        // Rechercher le cours par ID dans notre liste de cours
        this.course = this.courses.find(c => c.itemId === courseId);
        
        if (this.course) {
          this.processCourseData();
        } else {
          console.error('Course not found with ID:', courseId);
          // Vous pouvez ajouter un délai avant la redirection ou afficher un message d'erreur
          setTimeout(() => {
            this.router.navigate(['/accueil-etudiant']);
          }, 2000);
        }
      } else {
        console.error('No course ID provided');
        this.router.navigate(['/accueil-etudiant']);
      }
    }
  }

  private processCourseData(): void {
    if (!this.course) return;
    
    const prices = this.course.certificatePrice.split(',').map(p => p.trim());
    const dates = this.course.programDates.split(',').map(d => d.trim());

    if (dates.length >= 2 && prices.length >= 2) {
      // May offering
      const mayDates = dates[0].split(' - ');
      if (mayDates.length === 2) {
        const startDate = mayDates[0];
        const endDate = mayDates[1];
        
        this.mayOfferDetails = {
          month: 'May 2025',
          length: '4 weeks',
          hours: '4-5 hours per week',
          price: `$${prices[0]}`,
          dates: `${startDate} - ${endDate}`,
          applicationClose: 'May 19, 2025'
        };
      }

      // August offering
      const augustDates = dates[1].split(' - ');
      if (augustDates.length === 2) {
        const startDate = augustDates[0];
        const endDate = augustDates[1];
        
        this.augustOfferDetails = {
          month: 'August 2025',
          length: '4 weeks',
          hours: '4-5 hours per week',
          price: `$${prices[1]}`,
          dates: `${startDate} - ${endDate}`,
          applicationClose: 'Aug 18, 2025'
        };
      }
    }
  }

  applyNow(): void {
    // Implement application logic
    alert('Application form will open here');
  }

  enrollGroup(): void {
    // Implement group enrollment logic
    alert('Group enrollment form will open here');
  }

  goBack(): void {
    this.router.navigate(['/accueil-etudiant']);
  }
}