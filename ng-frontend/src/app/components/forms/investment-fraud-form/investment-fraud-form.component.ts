import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';

@Component({
  selector: 'app-investment-fraud-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  templateUrl: './investment-fraud-form.component.html',
  styleUrl: './investment-fraud-form.component.scss'
})
export class InvestmentFraudFormComponent {
  @Input() form!: FormGroup;
}
