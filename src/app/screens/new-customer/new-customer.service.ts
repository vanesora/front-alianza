import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(public dataApiService: DataApiService) {}

  public createCustomers(
    customer: any
  ): Promise<any> {

    return this.dataApiService.post(customer,
      `customers`
    );
  }
}
