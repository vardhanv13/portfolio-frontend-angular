import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  showMessage = false;
  statusMessage = '';
  isSuccess = false;
  submitted = false;
  private destroy$ = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

 
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  submit(): void {
    this.submitted = true;
    console.log(' Form submitted. Valid:', this.contactForm.valid);
    console.log('Form Value:', this.contactForm.value);
    
    if (!this.contactForm.valid) {
      console.log(' Form is invalid', this.contactForm.errors);
      return;
    }

    this.isSubmitting = true;
    const formData = this.contactForm.value;
    console.log(' Sending form data:', formData);

    this.contactService
      .sendMessage(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showSuccessMessage(' Message sent successfully! I\'ll get back to you soon.');
          this.resetForm();
          console.log(' Message sent successfully:', response);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.showErrorMessage(' Failed to send message. Please try again later.');
          console.error(' Error sending message:', err);
        }
      });
  }

 
  private showSuccessMessage(message: string): void {
    this.statusMessage = message;
    this.isSuccess = true;
    this.showMessage = true;
    this.hideMessageAfterDelay();
  }


  private showErrorMessage(message: string): void {
    this.statusMessage = message;
    this.isSuccess = false;
    this.showMessage = true;
    this.hideMessageAfterDelay();
  }


  private hideMessageAfterDelay(): void {
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsUntouched();
      this.contactForm.get(key)?.markAsPristine();
    });
    console.log(' Form reset');
  }
}

