import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from '../../general/radio/radio.component';

@Component({
  selector: 'app-other-form',
  standalone: true,
  imports: [ReactiveFormsModule, RadioComponent],
  templateUrl: './other-form.component.html',
  styleUrl: './other-form.component.scss'
})
export class OtherFormComponent {
  @Input() form!: FormGroup;
}
