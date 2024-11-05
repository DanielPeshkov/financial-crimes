import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from '../../general/tab/tab.component';
import { CardComponent } from '../../general/card/card.component';
import { CommonModule, Location } from '@angular/common';
import { SuspectFormComponent } from '../../forms/suspect-form/suspect-form.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormComponent } from '../../forms/contact-form/contact-form.component';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    TabComponent, CardComponent, SuspectFormComponent,
    ContactFormComponent, CommonModule, ReactiveFormsModule
  ],
  providers: [FormService],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  readonly form = inject(FormService).form;
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
      document.querySelectorAll('app-tab')[nextIndex].scrollIntoView({ behavior: 'smooth' });
  }

  formTypeSelect(type: string) {
    this.formType = type;
    this.location.replaceState('form/'+type);
  }

  onSubmit() {
    console.log(this.form.get('suspectForm')?.get('suspectYN')?.value);
    let arr = this.form.get('suspectForm')?.get('contactForm')?.get('contacts') as FormArray
    console.log(`Phone Nuuumber: ${arr.at(0).get('phoneNumber')?.value} Email: ${arr.at(0).get('email')?.value}`);
    // Form submission logic
  }

}
