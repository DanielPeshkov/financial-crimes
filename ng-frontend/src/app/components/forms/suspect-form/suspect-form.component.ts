import { Component, inject, Input, OnInit } from '@angular/core';
import { RadioComponent } from '../../general/radio/radio.component';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormService } from '../../../services/form.service';
import { IndividualFormComponent } from '../individual-form/individual-form.component';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suspect-form',
  standalone: true,
  imports: [
    RadioComponent, ReactiveFormsModule, SubjectFormComponent,
    ContactFormComponent, ToggleComponent, CommonModule
  ],
  templateUrl: './suspect-form.component.html',
  styleUrl: './suspect-form.component.scss'
})
export class SuspectFormComponent implements OnInit {
  readonly fs = inject(FormService);
  readonly form = this.fs.form.get('suspectForm') as FormGroup;

  ngOnInit(): void {
    
  }

  get subjects(): FormArray {
    return this.form.get('subjects') as FormArray;
  }

  addSubject() {
    this.fs.addSubject();
  }

  deleteSubject(i: number): void {
    this.fs.deleteSubject(i);
  }

  isYesSelected(): boolean {
    return this.form.get('suspectYN')?.value === 'Yes';
  }
}
