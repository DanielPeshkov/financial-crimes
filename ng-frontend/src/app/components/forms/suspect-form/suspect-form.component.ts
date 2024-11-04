import { Component, Input } from '@angular/core';
import { RadioComponent } from '../../general/radio/radio.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-suspect-form',
  standalone: true,
  imports: [RadioComponent, ReactiveFormsModule, ContactFormComponent],
  templateUrl: './suspect-form.component.html',
  styleUrl: './suspect-form.component.scss'
})
export class SuspectFormComponent {
  @Input() formGroup!: FormGroup;

  constructor() {}

  get contactForm() {
    return this.formGroup.get('contactForm') as FormGroup;
  }
}
