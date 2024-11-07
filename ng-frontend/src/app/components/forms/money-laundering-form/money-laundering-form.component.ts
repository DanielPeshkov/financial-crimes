import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';

@Component({
  selector: 'app-money-laundering-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  templateUrl: './money-laundering-form.component.html',
  styleUrl: './money-laundering-form.component.scss'
})
export class MoneyLaunderingFormComponent {
  @Input() form!: FormGroup;
}
