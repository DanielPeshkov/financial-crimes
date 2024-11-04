import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Output() deleteContactEvent = new EventEmitter<any>();

  delete() {
    this.deleteContactEvent.emit();
  }
}
