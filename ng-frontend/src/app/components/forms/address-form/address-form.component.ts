import { Component, inject, Input } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../../general/address-card/address-card.component';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddressCardComponent],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
  readonly fs = inject(FormService);
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  getAddress(i: number): FormGroup {
    return this.addresses.at(i) as FormGroup;
  }

  addAddress(): void {
    this.addresses.push(this.fs.createAddressControl());
  }

  deleteAddress(i: number): void {
    this.addresses.removeAt(i);
  }
}
