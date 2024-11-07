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
import { MortgageFraudFormComponent } from '../../forms/mortgage-fraud-form/mortgage-fraud-form.component';
import { InvestmentFraudFormComponent } from '../../forms/investment-fraud-form/investment-fraud-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    TabComponent, CardComponent, SuspectFormComponent,
    ContactFormComponent, CommonModule, ReactiveFormsModule,
    MoneyLaunderingFormComponent, MortgageFraudFormComponent,
    InvestmentFraudFormComponent
  ],
  providers: [FormService],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  readonly fs = inject(FormService);
  readonly form = this.fs.form;
  formType: string = "other";

  constructor(private route: ActivatedRoute, private location: Location) {
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
      document.querySelectorAll('app-tab')[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  formTypeSelect(type: string) {
    this.formType = type;
    this.location.replaceState('form/'+type);
  }

  onSubmit() {
    //console.log(this.form.get('suspectForm')?.get('suspectYN')?.value);
    let arr = this.form.get('suspectForm')?.get('contactForm')?.get('contacts') as FormArray;
    //console.log(`Phone Nuuumber: ${arr.at(0).get('phone')?.value} Email: ${arr.at(0).get('email')?.value}`);
    arr.controls?.forEach((contactControl, index) => {
      const contactGroup = contactControl as FormGroup;
      console.log(`Contact form at index: ${index}\nPhone: ${contactGroup.get('phone')?.value}\nEmail: ${contactGroup.get('email')?.value}\n`)
    })
    // Form submission logic
  }

}
