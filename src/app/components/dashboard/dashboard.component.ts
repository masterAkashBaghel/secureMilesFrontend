import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { StaticsComponent } from '../statics/statics.component';
import { FeaturesComponent } from '../features/features.component';
import { FooterComponent } from '../footer/footer.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    StaticsComponent,
    FeaturesComponent,
    FooterComponent,
    TestimonialComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
