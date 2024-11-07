import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentReport } from '../models/investmentreport';
import { BackendService } from '../services/backend.service';
import { Business } from '../models/business';
import { Individual } from '../models/individual';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {
  @Input() report: InvestmentReport = new InvestmentReport(null, null, null, null, null, null, null, 
    null, null, null, null, null, null,null, null, null, null, [], [])
    idField = new FormControl('idField');
    amountField = new FormControl('amountField');
    lossField = new FormControl('lossField');
    forceField = new FormControl('forceField');
    promiseField = new FormControl('promiseField');
    contractField = new FormControl('contractField');
    methodField = new FormControl('methodField');
    fundsField = new FormControl('fundsField');
    communicationField = new FormControl('communicationField');
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
      this.report = JSON.parse(localStorage.getItem('investmentReport')!);
      console.log('report individuals: ', this.report.investmentindividual)
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.idField.disable();
      this.amountField.setValue(this.report.amount? this.report.amount.toString() : '');
      this.lossField.setValue(this.report.loss? this.report.loss.toString() : '');
      this.forceField.setValue(this.report.force ? 'true' : 'false');
      this.promiseField.setValue(this.report.promise ? this.report.promise : '');
      this.contractField.setValue(this.report.contract ? 'true' : 'false');
      this.methodField.setValue(this.report.method ? this.report.method : '');
      this.fundsField.setValue(this.report.funds ? 'true' : 'false');
      this.communicationField.setValue(this.report.communication ? 'true' : 'false');
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

      for (let b of this.report.investmentbusiness) {
        console.log(b)
        this.business.push(b.business)
      }
      for (let i of this.report.investmentindividual) {
        console.log('i', i)
        this.individual.push(i.individual)
      }

      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        this.currentRole = storedRole;
        console.log(this.currentRole)
      }
    }

    checkForReport() {
      if (!localStorage.getItem('investmentReport')) {
        this.router.navigate(['/investment'])
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
        "amount": Number(this.amountField.getRawValue()),
        "loss": Number(this.lossField.getRawValue()),
        "force": Boolean(this.forceField.getRawValue()),
        "promise":this.promiseField.getRawValue(),
        "contract": Boolean(this.contractField.getRawValue()),
        "method":this.methodField.getRawValue(),
        "funds": Boolean(this.fundsField.getRawValue()),
        "communication": Boolean(this.communicationField.getRawValue()),
        "source": this.sourceField.getRawValue(),
        "documentation": Boolean(this.documentationField.getRawValue()),
        "description": this.descriptionField.getRawValue(),
        "contactId": this.contactIdField.getRawValue(),
        "status": this.statusField.getRawValue(),
        "created": this.createdField.getRawValue(),
        "updated": Date.now(),
      }
      // let resp = await this.client.put(`investment/report/${this.idField.getRawValue()}`, data).then(data => data.json());
      // console.log(resp)
      this.router.navigate(['/investment']);
    }

    cancel() {
      this.router.navigate(['/investment']);
    }

    async delete() {
      const id = this.idField.getRawValue();
      if (id) {
        await this.client.delete(`investment/report/${id}`)
      }
      this.router.navigate(['/investment']);
    }
}

