import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';

@Component({
  selector: 'app-embezzlement-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  templateUrl: './embezzlement-form.component.html',
  styleUrl: './embezzlement-form.component.scss'
})
export class EmbezzlementFormComponent {
  @Input() form!: FormGroup;
}
