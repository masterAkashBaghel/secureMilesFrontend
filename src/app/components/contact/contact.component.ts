import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private toast: ToastService) {}

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    console.log('Contact Form Submitted:', this.contactForm);
    this.toast.showSuccessToast('Message sent successfully');
    this.contactForm = {
      name: '',
      email: '',
      message: '',
    };
  }
}
