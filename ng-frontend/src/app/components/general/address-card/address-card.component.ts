import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  @Input() index: number = 0;
  @Output() deleteAddressEvent = new EventEmitter<any>();
  arr = inject(FormService).form.get('suspectForm')?.get('addressForm')?.get('addresses') as FormArray;
  form = this.arr.at(this.index) as FormGroup;
  
  delete() {
    this.deleteAddressEvent.emit();
  }
}
