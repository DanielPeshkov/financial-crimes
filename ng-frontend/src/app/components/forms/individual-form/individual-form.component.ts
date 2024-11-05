import { Component } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-individual-form',
  standalone: true,
  imports: [ToggleComponent, ContactFormComponent],
  templateUrl: './individual-form.component.html',
  styleUrl: './individual-form.component.scss'
})
export class IndividualFormComponent {
  onFormSwitch() {

  }
}
