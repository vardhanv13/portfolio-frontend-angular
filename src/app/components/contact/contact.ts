import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html'
})
export class Contact {

  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  submit() {
    this.contactService.sendMessage(this.contact).subscribe(() => {
      alert('Message sent successfully!');
      this.contact = { name: '', email: '', message: '' };
    });
  }
}
