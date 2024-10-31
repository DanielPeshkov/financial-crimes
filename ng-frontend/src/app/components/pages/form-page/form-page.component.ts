import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss'
})
export class FormPageComponent {
  formType: string = "other"

  constructor(private route: ActivatedRoute) {
    this.formType = this.route.snapshot.params['formtype'];
  }
}
