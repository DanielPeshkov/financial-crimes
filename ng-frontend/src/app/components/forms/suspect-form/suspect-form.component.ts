import { Component, inject, Input } from '@angular/core';
import { RadioComponent } from '../../general/radio/radio.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-suspect-form',
  standalone: true,
  imports: [RadioComponent, ReactiveFormsModule, ContactFormComponent],
  templateUrl: './suspect-form.component.html',
  styleUrl: './suspect-form.component.scss'
})
export class SuspectFormComponent {
  @Input() formGroup!: FormGroup;
  readonly form = inject(FormService).form.get('suspectForm') as FormGroup;

}
