import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { StorageService } from 'src/app/shared/services/storage.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public configService: ConfigurationService,
    public storageService: StorageService
  ) {
   }

  ngOnInit(): void {
  }

  

}
