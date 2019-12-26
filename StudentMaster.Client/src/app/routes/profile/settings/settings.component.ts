import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SettingsService } from '@core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  options = this.settings.getOptions();
  opened = false;

  @Output() optionsEvent = new EventEmitter<object>();

  constructor(private settings: SettingsService) {}

  ngOnInit() {}

  togglePanel() {
    this.opened = !this.opened;
  }

  openPanel() {
    this.opened = true;
  }

  closePanel() {
    this.opened = false;
  }

  sendOptions() {
    this.optionsEvent.emit(this.options);
  }
}
