import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-mortgage-fraud-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent, AddressFormComponent],
  templateUrl: './mortgage-fraud-form.component.html',
  styleUrl: './mortgage-fraud-form.component.scss'
})
export class MortgageFraudFormComponent {
  @Input() form!: FormGroup;
}
