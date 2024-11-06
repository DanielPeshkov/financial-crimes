import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OtherReport } from '../models/otherreport';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent {
  // @Input() report: OtherReport = new OtherReport(0, '', '', )
  idField = new FormControl('idField');
  typeField = new FormControl('typeField');
  sourceField = new FormControl('sourceField');
  incidentdateField = new FormControl('incidentdateField');
  approxField = new FormControl('approxField');
  locationField = new FormControl('locationField');
  documentationField = new FormControl('documentationField');
  descriptionField = new FormControl('descriptionField');
  contactidField = new FormControl('contactidField');
  statusField = new FormControl('statusField');
  createdField = new FormControl('createdField');
  updatedField = new FormControl('updatedField');

    constructor(private router: Router) {
      this.checkForReport();
      // this.report 
      this.idField.setValue('idField');
      this.typeField.setValue('typeField');
      this.sourceField.setValue('sourceField');
      this.incidentdateField.setValue('incidentdateField');
      this.approxField.setValue('approxField');
      this.locationField.setValue('locationField');
      this.typeField.setValue('typeField');
      this.sourceField.setValue('sourceField');
      this.documentationField.setValue('documentationField');
      this.descriptionField.setValue('descriptionField');
      this.contactidField.setValue('contactidField');
      this.statusField.setValue('statusField');
      this.createdField.setValue('createdField');
      this.updatedField.setValue('updatedField');
  }

  checkForReport() {
    if (!localStorage.getItem('otherReport')) {
      this.router.navigate(['/others'])
    }
  }
}
