import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit{
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addContact();
  }

  get contacts(): FormArray {
    return this.formGroup.get('contacts') as FormArray;
  }

  createContactControl(): FormGroup {
    return this.fb.group({
      phoneNumber: [''],
      email: ['']
    })
  }

  addContact(): void {
    this.contacts.push(this.createContactControl());
  }

  deleteContact(i: number): void {
    this.contacts.removeAt(i);
  }
}
