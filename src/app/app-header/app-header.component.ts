import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeader {
  fetchUrl: string = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=rdec-key-123-45678-011121314";

  // clickModalScrollParams={
	// 	titleParam: '測試 title (scroll modal)',
	// 	contentParam: '測試 contentParam (scroll modal)',
	// 	buttonParam: '測試 button (scroll modal)',
	// 	close: '測試 close button (scroll modal)'
	// }

  // clickModalCenterParams={
	// 	titleParam: '測試 title (center modal)',
	// 	contentParam: '測試 content (center modal)',
	// 	buttonParam: '測試 button (center modal)',
	// 	close: '測試 close button (center modal)'
	// }

  activeNav: string = '';
  navClick(navName: string) {
    this.activeNav = navName;
  }

}