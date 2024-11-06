import { Component, Input } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-individual-form',
  standalone: true,
  imports: [ToggleComponent, ContactFormComponent, AddressFormComponent, ReactiveFormsModule],
  templateUrl: './individual-form.component.html',
  styleUrl: './individual-form.component.scss'
})
export class IndividualFormComponent {
  @Input() form!: FormGroup;
}
