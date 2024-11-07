import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitutionReport } from '../models/institutionreport';
import { BackendService } from '../services/backend.service';
import { Business } from '../models/business';
import { Individual } from '../models/individual';

@Component({
  selector: 'app-institution',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss'
})
export class InstitutionComponent {
  @Input() report: InstitutionReport = new InstitutionReport(null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, [], [])
    idField = new FormControl('idField');
    institutionField = new FormControl('institutionField');
    incidentDateField = new FormControl('incidentDateField');
    approxField = new FormControl('approxField');
    methodField = new FormControl('methodField');
    employeeField = new FormControl('employeeField');
    sourceField = new FormControl('sourceField');
    documentationField = new FormControl('documentationField');
    descriptionField = new FormControl('descriptionField');
    contactIdField = new FormControl('contactidField');
    statusField = new FormControl('statusField');
    createdField = new FormControl('createdField');
    updatedField = new FormControl('updatedField');

    emailField = new FormControl('email');
    phoneField = new FormControl('phone');

    business: Business[] = [];
    individual: Individual[] = [];

    currentRole: string = 'guest';

    constructor(private router: Router, private client: BackendService) {
      this.checkForReport();
      this.report = JSON.parse(localStorage.getItem('institutionReport')!);
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.idField.disable();
      this.institutionField.setValue(this.report.institution? this.report.institution : '');
      this.incidentDateField.setValue(this.report.incidentDate ? this.report.incidentDate : '');
      this.approxField.setValue(this.report.approx ? 'true' : 'false');
      this.methodField.setValue(this.report.method? this.report.method : '');
      this.employeeField.setValue(this.report.employee? 'true' : '');
      this.sourceField.setValue(this.report.source ? this.report.source : '');
      this.documentationField.setValue(this.report.documentation ? 'true' : 'false');
      this.descriptionField.setValue(this.report.description);
      this.contactIdField.setValue(this.report.contactid ? this.report.contactid.toString() : '');
      this.contactIdField.disable();
      this.statusField.setValue(this.report.status ? this.report.status.toString() : '0');
      this.createdField.setValue(this.report.created);
      this.updatedField.setValue(this.report.updated);

      if (this.report.contact) {
        this.emailField.setValue(this.report.contact.email ? this.report.contact.email : '');
        this.phoneField.setValue(this.report.contact.phone ? this.report.contact.phone : '');
      }

      for (let b of this.report.institutionbusiness) {
        this.business.push(b.business)
      }
      for (let i of this.report.institutionindividual) {
        this.individual.push(i.individual)
      }

      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        this.currentRole = storedRole;
        console.log(this.currentRole)
      }
    }

    checkForReport() {
      if (!localStorage.getItem('institutionReport')) {
        this.router.navigate(['/institution'])
      }
    }
    
    async submitTeam() {
      let contact = {
        "email": this.emailField.getRawValue(),
        "phone": this.phoneField.getRawValue(),
      }
      this.client.put(`contact/${this.contactIdField.getRawValue()}`, contact)
      let data = {
        "id": Number(this.idField.getRawValue()),
        "institution": this.institutionField.getRawValue(),
        "incidentDate": this.incidentDateField.getRawValue(),
        "approx": Boolean(this.approxField.getRawValue()),
        "method": this.methodField.getRawValue(),
        "employee": this.employeeField.getRawValue(),
        "source": this.sourceField.getRawValue(),
        "documentation": Boolean(this.documentationField.getRawValue()),
        "description": this.descriptionField.getRawValue(),
        "contactId": this.contactIdField.getRawValue(),
        "status": this.statusField.getRawValue(),
        "created": this.createdField.getRawValue(),
        "updated": Date.now(),
      }
      // let resp = await this.client.put(`institution/report/${this.idField.getRawValue()}`, data).then(data => data.json());
      // console.log(resp)
      this.router.navigate(['/institution']);
    }

    cancel() {
      this.router.navigate(['/institution']);
    }

    async delete() {
      const id = this.idField.getRawValue();
      if (id) {
        await this.client.delete(`institution/report/${id}`)
      }
      this.router.navigate(['/institution']);
    }
}


