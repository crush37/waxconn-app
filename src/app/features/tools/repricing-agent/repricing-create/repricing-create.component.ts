import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { RepricingSerializer } from '@core/models/repricing.model';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-repricing-create',
  templateUrl: './repricing-create.component.html',
  providers: [
    ApiService,
    { provide: 'apiServiceEndpoint', useValue: 'repricings' },
    { provide: 'apiServiceOptions', useValue: {} },
    { provide: 'apiServiceSerializer', useClass: RepricingSerializer },
  ]
})
export class RepricingCreateComponent implements OnInit {
  loading = false;
  title = 'Repricing';
  subTitle = 'Create';

  form!: FormGroup;
  channels?: any;
  selectedChannels: string[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild?.data.subscribe((response: any) => {
      this.channels = response.app.channels;
    });
    this.form = new FormGroup({
      operation: new FormControl('create', Validators.required),
      type: new FormControl(null, Validators.required),
      channels: new FormControl(this.selectedChannels),
      operator: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      discountType: new FormControl(null, Validators.required),
      rounding: new FormControl(false)
    });
  }

  selectOperation(event: MatRadioChange): void {
    if (event.value === 'restore') {
      this.form.controls['operator'].disable()
      this.form.controls['value'].disable()
      this.form.controls['discountType'].disable()
      this.form.controls['rounding'].disable()
    } else {
      this.form.controls['operator'].enable()
      this.form.controls['value'].enable()
      this.form.controls['discountType'].enable()
      this.form.controls['rounding'].enable()
    }
  }

  selectChannel(id: string, event: MatCheckboxChange): void {
    const i = this.selectedChannels.indexOf(id);
    event.checked ?
      this.selectedChannels.push(id) :
      this.selectedChannels.splice(i, 1);
  }
}
