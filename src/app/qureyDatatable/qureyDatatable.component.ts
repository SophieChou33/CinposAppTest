import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { DataTableDirective } from 'angular-datatables';
import { FetchAPIService } from '../fetch-api.service';
import { TestInterface } from '../test-interface';
import { faFilter, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs';
import { ClickModalCenter } from '../click-modal-center/click-modal-center.component';
// push to dev 12
@Component({
  selector: 'app-query-datatable',
  templateUrl: './ngdatatable.component.html',
  styleUrl: './qureyDatatable.component.css'
})
export class QueryDatatable implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  @ViewChild(ClickModalCenter) ClickModalCenter!: ClickModalCenter;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  fetchUrl: string = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-3E4E5528-F7D0-4868-BDD0-C0B3F8311F95";

  apiData: TestInterface[] = [];
  filterdApiData: TestInterface[] = [];

  constructor(private fetchAPIService: FetchAPIService) {
  }

  defaultString: string = "--請選擇";
  CountyName: string = this.defaultString;
  TownName: string = this.defaultString;
  OriginCountyList: any = [];
  OriginTownList: any = [];
  filteredCountyList: any = [];
  filteredTownList: any = [];
  ifCountySelected: boolean = true;
  allowAllert: boolean = false;
  currentStationData: any = {};
  activeModal: boolean = false;
  ngOnInit() {
    this.fetchAPIService.doFetchData(this.fetchUrl, this.CountyName);
    this.fetchAPIService.apiDataObservSub.subscribe(data => {
      this.apiData = data;
      this.filterdApiData = data;
      this.doFilter();
    })
    // 取得有氣象站的縣市列表和鄉鎮市區列表(data.countyArr:['','',...]、data.townArr:[{},{},...])
    this.fetchAPIService.countyTownSub.subscribe(data => {
      this.OriginTownList = data.townArr;
      this.OriginCountyList = data.countyArr;
      this.filteredCountyList = data.countyArr;
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      destroy: true,
      columns: [
        { title: '編號', data: 'StationId' },
        { title: '名稱', data: 'StationName' },
        { title: '縣市', data: 'GeoInfo.CountyName' },
        { title: '鄉鎮市區', data: 'GeoInfo.TownName' },
        {
          title: '最後監測時間',
          data: 'ObsTime.DateTime',
          render: (data) => {
            const date = new Date(data).toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            });
            return date;
          },
          className: 'text-align-left',
        }, { title: '目前天氣', data: 'WeatherElement.Weather' },
        {
          title: '查看明細',
          data: 'StationId',
          render: (data: any, type: string, row: any) => {
            return `<button class="btn btn-primary" id="btnDetail-${row.StationId}" onclick="console.log('${data}'); 
      const input = document.querySelector('.hiddenCol');
      input.value = '${row.StationId}';
      input.dispatchEvent(new Event('change'));">查看明细</button>`;
          },
        }
      ],
    };
    this.dtTrigger.next(new Subject<any>());
  }

  clickModalCenterParams= {
    titleParam: '',
    contentParam: '',
    buttonParam: '',
    close: ''
  }
  clickModal(e: any) {
    this.activeModal = !this.activeModal;
    this.currentStationData=this.filterdApiData.filter((per)=>{return per.StationId==e.target.value})[0]
    if(this.currentStationData){
      this.clickModalCenterParams={ titleParam: `${this.currentStationData.StationName} - 詳細資訊`, contentParam: JSON.stringify(this.currentStationData), buttonParam: "OK", close: "Close" }
    }
  }
  activeModalChangeF(newActiveModalValue: boolean) {
    this.activeModal = newActiveModalValue;
  }

  doFilter() {
    if (this.CountyName == this.defaultString && this.TownName == this.defaultString) {
      this.filterdApiData = this.apiData;
    } else if (this.CountyName != this.defaultString && this.TownName == this.defaultString) {
      this.filterdApiData = this.apiData.filter((newItem: any) => {
        return newItem.GeoInfo.CountyName == this.CountyName;
      });
    } else if (this.CountyName != this.defaultString && this.TownName != this.defaultString) {
      this.filterdApiData = this.apiData.filter((newItem: any) => {
        return newItem.GeoInfo.CountyName == this.CountyName && newItem.GeoInfo.TownName == this.TownName;
      });
    } else {
      this.filterdApiData = this.apiData;
    }

    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: any) => {
        dtInstance.clear();
        dtInstance.rows.add(this.filterdApiData);
        dtInstance.draw();
      })
    }
  }

  countySelected(event: any) {
    this.TownName = this.defaultString;
    if (event.target.value != this.defaultString) {
      this.ifCountySelected = false;
      this.filteredTownList = this.OriginTownList.filter((townObj: any) => { return townObj.CountyName == event.target.value }).map((townObj: any) => { return townObj.TownName })
    } else {
      this.ifCountySelected = true;
      this.filteredTownList = this.OriginTownList.map((newItem: any) => { return newItem.TownName });
    }
  }
  doClear() {
    this.TownName = this.defaultString;
    this.CountyName = this.defaultString;
    this.ifCountySelected = true;
    this.doFilter();
    const dtInstance = this.datatableElement.dtInstance;
    dtInstance.then((dt: any) => {
    dt.order([0, 'asc']).draw();
  });
  }

  // fontawesome
  faFilter = faFilter;
  faTimesCircle = faTimesCircle;

}




