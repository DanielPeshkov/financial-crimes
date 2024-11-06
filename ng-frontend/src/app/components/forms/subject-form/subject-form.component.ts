import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToggleComponent } from '../../general/toggle/toggle.component';
import { BusinessFormComponent } from '../business-form/business-form.component';
import { IndividualFormComponent } from '../individual-form/individual-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [CommonModule, ToggleComponent, BusinessFormComponent, IndividualFormComponent, ReactiveFormsModule],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})
export class SubjectFormComponent {
  formType: string = "Individual";
  toggleState: boolean = true;
  @Output() deleteSubjectEvent = new EventEmitter<null>();
  @Input() form!: FormGroup;
  readonly fs = inject(FormService);

  onFormSwitch(state: boolean) {
    this.toggleState = state;
    
    if(state)
      this.formType = "Individual";
    else
      this.formType = "Business";
  }

  delete() {
    this.deleteSubjectEvent.emit();
  }
}
