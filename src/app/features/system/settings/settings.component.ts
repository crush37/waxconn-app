import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  loading = false;

  title = 'Settings';
  subTitle = 'System';

  formGroup!: UntypedFormGroup;

  constructor() {
    this.setFormGroup();
  }

  ngOnInit(): void {
  }

  setFormGroup(): void {
    this.formGroup = new UntypedFormGroup({});
  }
}
