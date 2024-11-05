import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { ContactCardComponent } from '../../general/contact-card/contact-card.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ContactCardComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  private readonly fs = inject(FormService);
  readonly form = this.fs.form.get('suspectForm')?.get('contactForm') as FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addContact();
  }

  get contacts(): FormArray {
    return this.fs.contacts;
  }

  addContact(): void {
    this.fs.addContact();
  }

  deleteContact(i: number): void {
    this.fs.deleteContact(i);
  }
}
