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
  @Input() report: OtherReport = new OtherReport(null, null, null, null, null, null, null, 
                                              null, null, null, null, null, null, [], [])
  idField = new FormControl('idField');
  typeField = new FormControl('typeField');
  sourceField = new FormControl('sourceField');
  incidentdateField = new FormControl('incidentdateField');
  approxField = new FormControl('approxField');
  locationField = new FormControl('locationField');
  documentationField = new FormControl('documentationField');
  descriptionField = new FormControl('descriptionField');
  contactIdField = new FormControl('contactidField');
  statusField = new FormControl('statusField');
  createdField = new FormControl('createdField');
  updatedField = new FormControl('updatedField');

    constructor(private router: Router) {
      this.checkForReport();
      this.report = JSON.parse(localStorage.getItem('otherReport')!);
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.typeField.setValue(this.report.type);
      this.sourceField.setValue(this.report.source);
      this.incidentdateField.setValue(this.report.incidentDate);
      this.approxField.setValue(this.report.approx ? this.report.approx.toString() : '');
      this.locationField.setValue(this.report.location);
      this.documentationField.setValue(this.report.documentation ? this.report.documentation.toString() : '');
      this.descriptionField.setValue(this.report.description);
      this.contactIdField.setValue(this.report.contactId ? this.report.contactId.toString() : '');
      this.statusField.setValue(this.report.status ? this.report.status.toString() : '0');
      this.createdField.setValue(this.report.created);
      this.updatedField.setValue(this.report.updated);
  }

  checkForReport() {
    if (!localStorage.getItem('otherReport')) {
      this.router.navigate(['/others'])
    }
  }
}
