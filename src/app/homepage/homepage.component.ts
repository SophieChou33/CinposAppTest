import { Component, OnInit } from '@angular/core';
// import { FetchAPIService } from '../fetch-api.service';
import { TestInterface } from '../test-interface';
import { FetchAPIService } from '../fetch-api.service';
// import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  // providers: [FetchAPIService]
})
export class HomepageComponent implements OnInit {
  // loading
  isLoading: boolean = true;

  fetchUrl: string =
    'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-3E4E5528-F7D0-4868-BDD0-C0B3F8311F95';
  calculatedObj: any = [];
  apiData: TestInterface[] = [];
  // 最高最低溫
  highestTemp: any = { temp: -99, county: '', datetime: '' };
  lowestTemp: any = { temp: -99, county: '', datetime: '' };
  // 最高最低風速
  highestWind: any = { windspeed: -99, county: '', datetime: '' };
  lowestWind: any = { windspeed: -99, county: '', datetime: '' };
  // 平均
  averageTemp: number = -99;
  averageWindSpeed: number = -99;

  timeFormat(time: any) {
    const formatedTime = new Date(time).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formatedTime;
  }
  // constructor(private http: HttpClient){}
  // fetchAPIService: FetchAPIService = new FetchAPIService(this.http);
  constructor(private fetchAPIService: FetchAPIService) {}

  ngOnInit() {
    this.isLoading = true;
    console.log('isLoading: ' + this.isLoading);
    this.fetchAPIService.doFetchData(this.fetchUrl);
    this.fetchAPIService.apiDataObservSub.subscribe((data) => {
      // 傳給 table {CountyName: '', count: 0}
      this.calculatedObj = data
        .map((county) => {
          return county.GeoInfo.CountyName;
        })
        .reduce((acc: any, current) => {
          acc[current] = (acc[current] || 0) + 1;
          return acc;
        }, {});
      this.calculatedObj = Object.keys(this.calculatedObj).map((perKey) => {
        return { CountyName: perKey, count: this.calculatedObj[perKey] };
      });
      // 傳給 homepannel (計算平均)
      this.apiData = data;
      this.apiData.forEach((item, i) => {
        item.ObsTime.DateTime = this.timeFormat(item.ObsTime.DateTime);
      });
      // 計算平均
      this.averageTemp =
        this.apiData
          .map((perData) => {
            return perData.WeatherElement.AirTemperature;
          })
          .filter((perData) => {
            return perData != -99;
          })
          .reduce((acc, elm) => {
            return acc + elm;
          }, 0) / this.apiData.length;
      this.averageTemp = parseFloat(this.averageTemp.toFixed(2));
      this.averageWindSpeed =
        this.apiData
          .map((perData) => {
            return perData.WeatherElement.WindSpeed;
          })
          .filter((perData) => {
            return perData != -99;
          })
          .reduce((acc, elm) => {
            return acc + elm;
          }, 0) / this.apiData.length;
      this.averageWindSpeed = parseFloat(this.averageWindSpeed.toFixed(2));
      // 取最高最低
      this.highestTemp = this.apiData
        .map((per) => {
          return {
            temp: per.WeatherElement.AirTemperature,
            county: per.GeoInfo.CountyName,
            datetime: per.ObsTime.DateTime,
          };
        })
        .filter((per) => {
          return per.temp != -99;
        })
        .reduce(
          (maxObj, current) => {
            return current.temp >= maxObj.temp ? current : maxObj;
          },
          { temp: 0, county: 0, datetime: 0 }
        );

      this.lowestTemp = this.apiData
        .map((per) => {
          return {
            temp: per.WeatherElement.AirTemperature,
            county: per.GeoInfo.CountyName,
            datetime: per.ObsTime.DateTime,
          };
        })
        .filter((per) => {
          return per.temp != -99;
        })
        .reduce(
          (minObj, current) => {
            return current.temp <= minObj.temp ? current : minObj;
          },
          { temp: 9999, county: 9999, datetime: 9999 }
        );
      this.highestWind = this.apiData
        .map((per) => {
          return {
            windspeed: per.WeatherElement.WindSpeed,
            county: per.GeoInfo.CountyName,
            datetime: per.ObsTime.DateTime,
          };
        })
        .filter((per) => {
          return per.windspeed != -99;
        })
        .reduce(
          (maxObj, current) => {
            return current.windspeed >= maxObj.windspeed ? current : maxObj;
          },
          { windspeed: 0, county: 0, datetime: 0 }
        );
      this.lowestWind = this.apiData
        .map((per) => {
          return {
            windspeed: per.WeatherElement.WindSpeed,
            county: per.GeoInfo.CountyName,
            datetime: per.ObsTime.DateTime,
          };
        })
        .filter((per) => {
          return per.windspeed != -99;
        })
        .reduce(
          (minObj, current) => {
            return current.windspeed <= minObj.windspeed ? current : minObj;
          },
          { windspeed: 9999, county: 9999, datetime: 9999 }
        );
        setTimeout(()=>{
          this.isLoading = false;
        }, 500)
      });
    
    console.log('isLoading: ' + this.isLoading);
  }
}
