import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent implements OnInit {
  @Input() index: number = 0;
  @Output() deleteContactEvent = new EventEmitter<number>();
  readonly fs = inject(FormService);
  initialInd: number = 0;
  form!: FormGroup;

  ngOnInit(): void {
    this.initialInd = this.index;
    this.form = this.fs.getContact(this.index);
  }
  
  delete() {
    console.log(`Deleting at index ${this.index}`)
    this.deleteContactEvent.emit(this.index);
  }
}
