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
  readonly fs = inject(FormService);
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  getContact(i: number): FormGroup {
    return this.contacts.at(i) as FormGroup;
  }

  addContact(): void {
    this.contacts.push(this.fs.createContactControl());
  }

  deleteContact(i: number): void {
    this.contacts.removeAt(i);
  }
}
