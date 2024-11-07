import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from '../../general/tab/tab.component';
import { CardComponent } from '../../general/card/card.component';
import { CommonModule, Location } from '@angular/common';
import { SuspectFormComponent } from '../../forms/suspect-form/suspect-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormComponent } from '../../forms/contact-form/contact-form.component';
import { FormService } from '../../../services/form.service';
import { MoneyLaunderingFormComponent } from '../../forms/money-laundering-form/money-laundering-form.component';
import { createIndividual, Individual } from '../../../models/individual';
import { BackendService } from '../../../services/backend.service';
import { Business, createBusiness } from '../../../models/business';
import { LaunderingReport } from '../../../models/launderingreport';
import { MortgageFraudFormComponent } from '../../forms/mortgage-fraud-form/mortgage-fraud-form.component';
import { LaunderingIndividual } from '../../../models/launderingindividual';
import { LaunderingBusiness } from '../../../models/launderingbusiness';
import { InvestmentFraudFormComponent } from '../../forms/investment-fraud-form/investment-fraud-form.component';
import { InstitutionFraudFormComponent } from '../../forms/institution-fraud-form/institution-fraud-form.component';
import { EmbezzlementFormComponent } from '../../forms/embezzlement-form/embezzlement-form.component';
import { OtherFormComponent } from '../../forms/other-form/other-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    TabComponent, CardComponent, SuspectFormComponent,
    ContactFormComponent, CommonModule, ReactiveFormsModule,
    MoneyLaunderingFormComponent, MortgageFraudFormComponent,
    InvestmentFraudFormComponent, EmbezzlementFormComponent,
    InstitutionFraudFormComponent, OtherFormComponent
  ],
  providers: [FormService],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  readonly fs = inject(FormService);
  readonly form = this.fs.form;
  formType: string = "other";

  constructor(private route: ActivatedRoute, private location: Location, private client: BackendService) {
    this.formType = this.route.snapshot.params['formtype'];
  }

  @ViewChildren(TabComponent) tabs!: QueryList<TabComponent>;

  nextForm(nextIndex: number) {
    // Collapse the current form
    const tabArr = this.tabs.toArray();
    tabArr.forEach((tab, i) => {
      tab.setShown(i === nextIndex);
    });

    if (nextIndex < this.tabs.length)
      document.querySelectorAll('app-tab')[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }

  formTypeSelect(type: string) {
    this.formType = type;
    this.location.replaceState('form/'+type);
  }

  async onSubmit() {
    let arr = this.form.get('suspectForm')//?.get('contactForm')?.get('contacts') as FormArray;
    // console.log(`Phone Nuuumber: ${arr.at(0).get('phone')?.value} Email: ${arr.at(0).get('email')?.value}`);

    let individuals: Individual[] = [];
    let businesses: Business[] = [];
    if (this.form.get('suspectForm')?.get('suspectYN')?.value == 'Yes' && arr) {
      let sf = arr.get('subjects')
      if (sf) {
        for (let v of sf.value) {
          if (v.business.businessName) {
            console.log('business: ', v.business)
            let data = v.business
            data.contact = {};
            data.address = {};
            data.name = v.business.businessName;
            if (v.business.contacts.length) {
              // Iterate over each contact
              for (let c of v.business.contacts) {
                data.contact = await this.client.post('contact', c).then(data => data.json());
                data.contactid = data.contact.id;
                // Iterate over each address for each contact
                if (v.business.addresses.length) {
                  for (let a of v.business.addresses) {
                    data.address = await this.client.post('address', a).then(data => data.json());
                    data.addressid = data.address.id;
                    let bus = createBusiness(data);
                    businesses.push(bus);
                  }
                } else {
                  // no address for each contact
                  data.address = {};
                  let bus = createBusiness(data);
                  businesses.push(bus);
                }
              }
            } else {
              // no contacts
              // Iterate over each address for each contact
              if (v.business.addresses.length) {
                for (let a of v.business.addresses) {
                  data.address = await this.client.post('address', a).then(data => data.json());
                  data.addressid = data.address.id;
                  let bus = createBusiness(data);
                  businesses.push(bus);
                }
              } else {
                // no address or contact
                data.address = {};
                let bus = createBusiness(data);
                businesses.push(bus);
              }
            }
            ////////////////////////
          } else {
            // Parsing individuals
            // parse birth and age
            try {
              let date = new Date(Date.parse(v.individual.birth));
              v.individual.birth = date.toLocaleDateString();
              v.individual.age = Math.floor((Date.now() - date.getTime()) / 31536000000);
              v.individual.approx = false;
              if (Number.isNaN(v.individual.age)) {
                v.individual.birth = '';
                v.individual.age = 0;
                v.individual.approx = true;
              }
            } catch {
              console.log('invalid birth date');
            }
            let data = v.individual
            data.contact = {};
            data.address = {};
            if (v.individual.contacts.length) {
              // Iterate over each contact
              for (let c of v.individual.contacts) {
                data.contact = await this.client.post('contact', c).then(data => data.json());
                data.contactId = data.contact.id;
                // Iterate over each address for each contact
                if (v.individual.addresses.length) {
                  for (let a of v.individual.addresses) {
                    data.address = await this.client.post('address', a).then(data => data.json());
                    data.addressId = data.address.id;
                    let ind = createIndividual(data);
                    individuals.push(ind);
                  }
                } else {
                  // no address for each contact
                  data.address = {};
                  let ind = createIndividual(data);
                  individuals.push(ind);
                }
              }
            } else {
              // no contacts
              // Iterate over each address for each contact
              if (v.individual.addresses.length) {
                for (let a of v.individual.addresses) {
                  data.address = await this.client.post('address', a).then(data => data.json());
                  data.addressId = data.address.id;
                  let ind = createIndividual(data);
                  individuals.push(ind);
                }
              } else {
                // no address or contact
                data.address = {};
                let ind = createIndividual(data);
                individuals.push(ind);
              }
            }
          }
        }
      }
    }
    console.log('businesses: ', businesses);
    console.log('individuals: ', individuals);
    let inds = [];
    let buss = [];
    for (let i = 0; i < individuals.length; i++) {
      // let resp = await this.client.post('individual', individuals[i])//.then(data => data.json());
      // console.log('resp: ', resp)
      // // inds.push(resp.json())
      // console.log('json: ', resp.json());
      console.log(individuals[i])
    }
    for (let i = 0; i < businesses.length; i++) {
      // buss.push(await this.client.post('business', businesses[i]).then(data => data.json()));
    }



    // Form submission logic
    // let questions = this.form.get('crimeQuestions')
    // let ml = questions?.get('moneyLaunderingForm')?.value;
    // let reportid;
    // if (ml) {
    //   let report = await this.processLaundering(ml);
    //   for (let ind of inds) {
    //     // let res = ind.id;
    //     // let li = new LaunderingIndividual(0, report.id, res.id, report, res)
    //     console.log(ind);
    //   }
    //   for (let bus of buss) {
    //     // let res = await bus;
    //     console.log(bus)
    //     // let bi = new LaunderingBusiness(0, report.id, res.id, report, res)
    //     // console.log(bi);
    //   }
    // }
    // console.log('id', reportid)
  }

  async processLaundering(f: any) {
    let {amount, approx, description, documentation, incidentDate, 
      location, method, organized, processing, source} = f;
    approx = Boolean(approx);
    amount = Number.isNaN(Number(amount)) ? 0 : Number(amount);
    incidentDate = Date.parse(incidentDate);
    incidentDate = Number.isNaN(incidentDate) ? '' : new Date(incidentDate).toLocaleDateString();
    documentation = documentation == 'Yes';
  
    let report = new LaunderingReport(0, amount, source, method, processing, 
      location, incidentDate, approx, organized, documentation, description, 0, 
      0, new Date(Date.now()).toLocaleDateString(), 
      new Date(Date.now()).toLocaleDateString(), null, [], [])
    
    let resp = await this.client.post('laundering/report', report).then(data => data.json());
    return resp;
  }
}
