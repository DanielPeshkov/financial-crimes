import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormService {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      suspectForm: this.fb.group({
        suspectYN: ['', [ Validators.required ]],
        contactForm: this.fb.group({
          contacts: this.fb.array([])
        }),
        addressForm: this.fb.group({
          addresses: this.fb.array([])
        })
      })
    });
  }

  get contacts(): FormArray {
    return this.form.get('suspectForm')?.get('contactForm')?.get('contacts') as FormArray;
  }

  createContactControl(): FormGroup {
    return this.fb.group({
      phone: [''],
      email: ['']
    })
  }

  getContact(i: number): FormGroup {
    return this.contacts.at(i) as FormGroup;
  }

  addContact(): void {
    this.contacts.push(this.createContactControl());
  }

  deleteContact(i: number): void {
    this.contacts.removeAt(i);
    this.contacts.controls?.forEach((contactControl, index) => {
      const contactGroup = contactControl as FormGroup;
      console.log(`Contact form at index: ${index}\nPhone: ${contactGroup.get('phone')?.value}\nEmail: ${contactGroup.get('email')?.value}\n`)
    })
  }
}
