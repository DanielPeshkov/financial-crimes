import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';

@Component({
  selector: 'app-institution-fraud-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  templateUrl: './institution-fraud-form.component.html',
  styleUrl: './institution-fraud-form.component.scss'
})
export class InstitutionFraudFormComponent {
  @Input() form!: FormGroup;
}
