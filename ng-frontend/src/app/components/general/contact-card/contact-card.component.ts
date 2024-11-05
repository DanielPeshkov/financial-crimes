import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input() index: number = 0;
  @Output() deleteContactEvent = new EventEmitter<any>();
  arr = inject(FormService).form.get('suspectForm')?.get('contactForm')?.get('contacts') as FormArray;
  form = this.arr.at(this.index) as FormGroup;
  
  delete() {
    this.deleteContactEvent.emit();
  }
}
