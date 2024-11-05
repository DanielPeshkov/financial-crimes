import { Component, inject, Input } from '@angular/core';
import { RadioComponent } from '../../general/radio/radio.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormService } from '../../../services/form.service';
import { IndividualFormComponent } from '../individual-form/individual-form.component';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { SubjectFormComponent } from '../subject-form/subject-form.component';

@Component({
  selector: 'app-suspect-form',
  standalone: true,
  imports: [
    RadioComponent, ReactiveFormsModule, SubjectFormComponent,
    ContactFormComponent, ToggleComponent
  ],
  templateUrl: './suspect-form.component.html',
  styleUrl: './suspect-form.component.scss'
})
export class SuspectFormComponent {
  @Input() formGroup!: FormGroup;
  readonly form = inject(FormService).form.get('suspectForm') as FormGroup;

}
