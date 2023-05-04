import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { CustomerService } from './new-customer.service';
import * as moment from 'moment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent implements OnInit {
  customerFormGroup: FormGroup;

  constructor(
    public configService: ConfigurationService,
    public customerService: CustomerService,
    public storageService: StorageService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.customerFormGroup = this.fb.group({
      name:  ['', [Validators.required]],
      email:  ['', [Validators.required, Validators.email]],
      phone:  [undefined, [Validators.required]],
      addedDate: [undefined, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  save() {
    if (!this.customerFormGroup?.valid) {
      this.configService.validationError();
      return
    }

    this.configService.setLoadingPage(true);
    const {
      name,
      email,
      phone,
      addedDate,
    } = this.customerFormGroup.value;
    const user: any = {
      name,
      email,
      phone,
      addedDate: moment(addedDate).format('YYYY-MM-DD')
    };

    return this.customerService.createCustomers(user).finally(()=>{
      this.configService.setLoadingPage(false);
      this.router.navigate([`customers`]);
    })
  }

 
}
