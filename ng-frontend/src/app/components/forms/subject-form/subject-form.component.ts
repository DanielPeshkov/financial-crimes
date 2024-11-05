import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { IndividualFormComponent } from '../individual-form/individual-form.component';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [CommonModule, ToggleComponent, BusinessFormComponent, IndividualFormComponent],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})
export class SubjectFormComponent {
  formType: string = "Individual";
  toggleState: boolean = true;

  onFormSwitch(state: boolean) {
    this.toggleState = state;
    
    if(state)
      this.formType = "Individual";
    else
      this.formType = "Business";
  }
}
