import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() options: any;
  @Output() selectedValue = new EventEmitter();

  ngOnInit(): void {}
  detectChange(event: any) {
    this.selectedValue.emit(event)
  }
}
