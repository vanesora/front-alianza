import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(public dataApiService: DataApiService) {}

  public getCustomers(
    id?: string | null | undefined,
    name?: string | null | undefined,
    email?: string | null | undefined,
    phone?: string | null | undefined,
    dateStart?: string | null | undefined,
    dateEnd?: string | null | undefined
  ): Promise<any> {
    if (id)
      return this.getTeamsFiltered(
        id,
      );
    if(name || email || phone || dateStart || dateEnd){
      return this.getTeamsFiltered(
        null, name, email, phone, dateStart, dateEnd
      );
    }
    return this.dataApiService.getAll(
      `customers`
    );
  }

  public getTeamsFiltered(
    id?: string  | null | undefined,
    name?: string  | null | undefined,
    email?: string  | null | undefined,
    phone?: string |  null | undefined,
    dateStart?: string | null | undefined,
    dateEnd?: string | null | undefined
  ) {
    if (id) {
      return this.dataApiService
        .getAll(`customers`, {'key': id})
    } else if(name || email || phone || dateStart || dateEnd) {
      return this.dataApiService
        .getAll(`customers`, {'name': name, 'email': email, 'phone': phone, 'start' : dateStart, 'end': dateEnd})
    } else{
      return this.dataApiService
        .getAll(`customers`)
    }
  }
}
