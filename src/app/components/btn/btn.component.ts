import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [NgClass],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
})
export class BtnComponent {
  @Output() onClick = new EventEmitter();
  @Input('type') type: 'basic' | 'danger' | 'save' = 'basic';

  clickHandler(event: Event) {
    event.stopPropagation();

    this.onClick.emit();
  }
}
