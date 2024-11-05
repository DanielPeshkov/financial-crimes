import { Component, inject } from '@angular/core';
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
  readonly form = this.fs.form.get('suspectForm')?.get('addressForm') as FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addAddress();
  }

  get addresses(): FormArray {
    return this.fs.addresses;
  }

  addAddress(): void {
    this.fs.addAddress();
  }

  deleteAddress(i: number): void {
    this.fs.deleteAddress(i);
  }
}
