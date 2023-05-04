import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { CustomerService } from './customer.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';

interface USER {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  reg_date: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {}

  ELEMENT_DATA: USER[] = [];
  isLoading = false;

  displayedColumns: string[] = [
    'key',
    'name',
    'email',
    'phone',
    'date',
    'actions',
  ];
  dataSource: MatTableDataSource<USER> = new MatTableDataSource();

  // filters
  filtersFormGroup = this.fb.group({
    name: undefined as undefined | string,
    email: undefined as undefined | string,
    phone: undefined as undefined | number,
    dateStart: undefined as undefined | Date,
    dateEnd: undefined as undefined | Date,
  });

  filterKeyFormGroup = this.fb.group({
    key: [''],
  });

  public viewFilters= false;

  constructor(
    public configService: ConfigurationService,
    public customerService: CustomerService,
    public storageService: StorageService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData(type?: 'key' | 'filter') {
    this.configService.setLoadingPage(true);
    try {
      let result: any[] = [];
      if (!type) {
        result = await this.customerService.getCustomers();
        this.viewFilters= false;
      } else if (type === 'key') {
        result = await this.customerService.getCustomers(
          this.filterKeyFormGroup.value.key
        );
        this.viewFilters= false;
      } else {
        result = await this.customerService.getCustomers(
          null,
          this.filtersFormGroup.value.name,
          this.filtersFormGroup.value.email,
          this.filtersFormGroup.value.phone?.toString(),
          this.filtersFormGroup.value.dateStart? moment(this.filtersFormGroup.value.dateStart).format('YYYY-MM-DD'): null,
          this.filtersFormGroup.value.dateEnd? moment(this.filtersFormGroup.value.dateEnd).format('YYYY-MM-DD'): null
        );
      }
      this.dataSource.data = result?.map((data: any) => {
        return {
          ...data,
          addedDate: moment(data.addedDate).format('DD/MM/YYYY'),
        };
      });
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public handleAction(id: string) {
    console.log();
  }

  public createNew(){
    this.router.navigate([`new-customer`]);
  }
}
