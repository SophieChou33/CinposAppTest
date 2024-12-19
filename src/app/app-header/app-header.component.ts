import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeader {
  @Input() name : string = "99";
  fetchUrl: string = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=rdec-key-123-45678-011121314";

  activeNav: string = '';
  navClick(navName: string) {
    this.activeNav = navName;
  }
  // fontawesome
  faBars=faBars
}