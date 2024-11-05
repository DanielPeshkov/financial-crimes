import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  @Output() deleteAddressEvent = new EventEmitter<null>();
  readonly fs = inject(FormService);
  @Input() form!: FormGroup;
  
  delete() {
    this.deleteAddressEvent.emit();
  }
}
