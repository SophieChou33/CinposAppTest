import { Component,  OnInit } from '@angular/core';
import { FetchAPIService } from '../fetch-api.service';
import { TestInterface } from '../test-interface';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  fetchUrl: string = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-3E4E5528-F7D0-4868-BDD0-C0B3F8311F95";
  CountyList: any = [];
  calculatedObj: any = [];
  apiData: TestInterface[] = [];

  constructor(private fetchAPIService: FetchAPIService) {}
  ngOnInit() {
    this.fetchAPIService.doFetchData(this.fetchUrl);
    this.fetchAPIService.apiDataObservSub.subscribe((data) => {
      // 傳給 table {CountyName: '', count: 0}
      this.calculatedObj = data.map((county)=>{return county.GeoInfo.CountyName}).reduce((acc: any, current)=>{
        acc[current]=(acc[current]||0)+1;
        return acc;
      }, {})
      // 傳給 homepannel
      this.apiData=data;
    });
    this.fetchAPIService.countyTownSub.subscribe(data => {
      this.CountyList = data.countyArr;
    })
  }
  observeConsole(){
    console.log(this.calculatedObj)
  }
}
