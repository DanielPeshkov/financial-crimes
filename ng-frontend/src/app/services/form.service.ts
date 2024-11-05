import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  createContactControl(): FormGroup {
    return this.fb.group({
      phone: [''],
      email: ['']
    })
  }

  createAddressControl(): FormGroup {
    return this.fb.group({
      type: [''],
      street: [''],
      street2: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: ['']
    })
  }

  get contacts(): FormArray {
    return this.form.get('suspectForm')?.get('contactForm')?.get('contacts') as FormArray;
  }

  getContact(i: number): FormGroup {
    return this.contacts.at(i) as FormGroup;
  }

  addContact(): void {
    this.contacts.push(this.createContactControl());
  }

  deleteContact(i: number): void {
    this.contacts.removeAt(i);
  }

  get addresses(): FormArray {
    return this.form.get('suspectForm')?.get('addressForm')?.get('addresses') as FormArray;
  }

  getAddress(i: number): FormGroup {
    return this.addresses.at(i) as FormGroup;
  }

  addAddress(): void {
    this.addresses.push(this.createAddressControl());
  }

  deleteAddress(i: number): void {
    this.addresses.removeAt(i);
  }
}
