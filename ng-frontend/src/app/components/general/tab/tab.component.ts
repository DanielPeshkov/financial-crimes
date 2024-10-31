import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() shown: boolean = false;
  @Input() tabHeader: string = "Tab Name";

  @Output() nextTabEvent = new EventEmitter<void>();

  setShown(value: boolean) {
    this.shown = value;
  }

  next() {
    this.nextTabEvent.emit();
  }
}
