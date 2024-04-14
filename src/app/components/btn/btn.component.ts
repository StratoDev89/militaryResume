import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
})
export class BtnComponent {
  @Output() onClick = new EventEmitter();

  clickHandler(event:Event) {
    event.stopPropagation()

    this.onClick.emit();
  }
}
