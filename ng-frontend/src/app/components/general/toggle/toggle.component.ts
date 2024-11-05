import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {
  @Output() toggleEvent = new EventEmitter<boolean>();
  isToggled: boolean = true;

  onToggle() {
    this.toggleEvent.emit(this.isToggled);
  }
}
