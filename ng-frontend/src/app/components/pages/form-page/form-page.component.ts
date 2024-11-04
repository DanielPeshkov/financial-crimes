import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from '../../general/tab/tab.component';
import { CardComponent } from '../../general/card/card.component';
import { CommonModule, Location } from '@angular/common';
import { SuspectFormComponent } from '../../forms/suspect-form/suspect-form.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactFormComponent } from '../../forms/contact-form/contact-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    TabComponent, CardComponent, SuspectFormComponent,
    ContactFormComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  mainForm: FormGroup;
  suspectForm: FormGroup;
  suspectContactForm: FormGroup;

  formType: string = "other";

  constructor(private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    this.formType = this.route.snapshot.params['formtype'];

    this.suspectContactForm = this.fb.group({
      contacts: this.fb.array([])
    })

    this.suspectForm = this.fb.group({
      suspectYN: new FormControl('', [ Validators.required ]),
      contactForm: this.suspectContactForm
    })

    this.mainForm = this.fb.group({
      suspectForm: this.suspectForm
    });
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
    console.log(this.mainForm.get('suspectForm')?.get('suspectYN')?.value);
    // Form submission logic
  }

}
