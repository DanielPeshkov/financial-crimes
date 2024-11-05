import { Component } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';

@Component({
  selector: 'app-business-form',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './business-form.component.html',
  styleUrl: './business-form.component.scss'
})
export class BusinessFormComponent {

}
