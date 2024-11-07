import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MortgageReport } from '../models/mortgagereport';
import { BackendService } from '../services/backend.service';
import { Business } from '../models/business';
import { Individual } from '../models/individual';

@Component({
  selector: 'app-mortgage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mortgage.component.html',
  styleUrl: './mortgage.component.scss'
})
export class MortgageComponent {
  @Input() report: MortgageReport = new MortgageReport(null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, null, null, null, [], [])
    idField = new FormControl('idField');
    amountField = new FormControl('amountField');
    loanField = new FormControl('loanField');
    paymentsField = new FormControl('paymentsField');
    ownerField = new FormControl('ownerField');
    addressidField = new FormControl('addressidField');
    mortgageField = new FormControl('mortgageField');
    titleField = new FormControl('titleField');
    agentField = new FormControl('agentField');
    typeField = new FormControl('typeField');
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
      this.report = JSON.parse(localStorage.getItem('mortgageReport')!);
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.idField.disable();
      this.amountField.setValue(this.report.amount? this.report.amount.toString() : '');
      this.loanField.setValue(this.report.loan? this.report.loan.toString() : '');
      this.paymentsField.setValue(this.report.payments ? 'true' : 'false');
      this.ownerField.setValue(this.report.owner ? this.report.owner : '');
      this.addressidField.setValue(this.report.addressid ? this.report.addressid.toString() : '');
      this.mortgageField.setValue(this.report.mortgage ? this.report.mortgage : '');
      this.titleField.setValue(this.report.title ? this.report.title : '');
      this.agentField.setValue(this.report.agent ? this.report.agent : '');
      this.typeField.setValue(this.report.type ? this.report.type : '');
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

      for (let b of this.report.mortgagebusiness) {
        this.business.push(b)
      }
      for (let i of this.report.mortgageindividual) {
        this.individual.push(i)
      }

      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        this.currentRole = storedRole;
        console.log(this.currentRole)
      }
    }

    checkForReport() {
      if (!localStorage.getItem('mortgageReport')) {
        this.router.navigate(['/mortgage'])
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
        "amount": this.amountField.getRawValue(),
        "loan": this.loanField.getRawValue(),
        "payments": Boolean(this.paymentsField.getRawValue()),
        "owner": this.ownerField.getRawValue(),
        "addressId": this.addressidField.getRawValue(),
        "mortgage": this.mortgageField.getRawValue(),
        "title": this.titleField.getRawValue(),
        "agent": this.agentField.getRawValue(),
        "type": this.typeField.getRawValue(),
        "source": this.sourceField.getRawValue(),
        "documentation": Boolean(this.documentationField.getRawValue()),
        "description": this.descriptionField.getRawValue(),
        "contactId": this.contactIdField.getRawValue(),
        "status": this.statusField.getRawValue(),
        "created": this.createdField.getRawValue(),
        "updated": Date.now(),
      }
      let resp = await this.client.put(`mortgage/report/${this.idField.getRawValue()}`, data).then(data => data.json());
      console.log(resp)
      this.router.navigate(['/mortgage']);
    }

    cancel() {
      this.router.navigate(['/mortgage']);
    }

    async delete() {
      const id = this.idField.getRawValue();
      if (id) {
        await this.client.delete(`mortgage/report/${id}`)
      }
      this.router.navigate(['/mortgage']);
    }
}
