import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormService {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      suspectForm: this.fb.group({
        suspectYN: ['', [ Validators.required ]],
        subjects: this.fb.array([])
      }),
      crimeQuestions: this.fb.group({
        moneyLaunderingForm: this.fb.group({
          amount: [''],
          source: [''],
          method: [''],
          processing: [''],
          location: [''],
          incidentDate: [''],
          approx: [''],
          organized: [''],
          documentation: [''],
          description: ['']
        }),
        mortgageFraudForm: this.fb.group({
          amount: [''],
          loan: [''],
          payments: [''],
          owner: [''],
          addresses: this.fb.array([]),
          mortgage: [''],
          title: [''],
          agent: [''],
          type: [''],
          source: [''],
          documentation: [''],
          description: ['']
        }),
        investmentFraudForm: this.fb.group({

        }),
        embezzlementForm: this.fb.group({

        }),
        institutionFraudForm: this.fb.group({

        }),
        otherForm: this.fb.group({

        })
      }),
      contactInfo: this.fb.group({
        contacts: this.fb.array([])
      })
    });
  }

  createSubjectControl(): FormGroup {
    return this.fb.group({
      type: ['Individual'],
      individual: this.fb.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        birth: [''],
        approx: [''],
        contacts: this.fb.array([]),
        addresses: this.fb.array([])
      }),
      business: this.fb.group({
        businessName: [''],
        contacts: this.fb.array([]),
        addresses: this.fb.array([])
      })
    })
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

  get subjects(): FormArray {
    return this.form.get('suspectForm')?.get('subjects') as FormArray;
  }

  get contactInfo(): FormGroup {
    return this.form.get('contactInfo') as FormGroup;
  }

  get moneyLaundering(): FormGroup {
    return this.form.get('crimeQuestions')?.get('moneyLaunderingForm') as FormGroup;
  }

  get mortgageFraud(): FormGroup {
    return this.form.get('crimeQuestions')?.get('mortgageFraudForm') as FormGroup;
  }

  getAsFG(control: any): FormGroup {
    return control as FormGroup;
  }

  getSubject(i: number): FormGroup {
    return this.subjects.at(i) as FormGroup;
  }

  addSubject(): void {
    this.subjects.push(this.createSubjectControl());
  }

  deleteSubject(i: number): void {
    this.subjects.removeAt(i);
  }
}
