import { Component, Input } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-business-form',
  standalone: true,
  imports: [ToggleComponent, ContactFormComponent, AddressFormComponent, ReactiveFormsModule],
  templateUrl: './business-form.component.html',
  styleUrl: './business-form.component.scss'
})
export class BusinessFormComponent {
  @Input() form!: FormGroup;
}
