import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Output() deleteContactEvent = new EventEmitter<number>();
  readonly fs = inject(FormService);
  @Input() form!: FormGroup;
  
  delete() {
    this.deleteContactEvent.emit();
  }
}
