import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    console.log('Contact Form Submitted:', this.contactForm);
    // You can send this data to your backend using HTTP requests
    // Example: Use Angular's HttpClient for POST request
  }
}



  

