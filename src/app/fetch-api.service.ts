import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestInterface } from './test-interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService{
  apiDataObservSub= new BehaviorSubject<TestInterface[]>([]);
  countyTownSub=new BehaviorSubject<any>({});
  constructor(private http: HttpClient) { } 

  fetchData(url: string): Observable<any> {
    return this.http.get(url);
  }
  doFetchData(url: string, CountyName?:string) {
    this.fetchData(url).subscribe(res => {
      this.apiDataObservSub.next(res.records.Station);
      const countyArr=[...new Set(res.records.Station.map((county:any)=>{return county.GeoInfo.CountyName}))]
      const townArr=[...new Set(res.records.Station.map((per:any)=>{return JSON.stringify({CountyName: per.GeoInfo.CountyName, TownName: per.GeoInfo.TownName})}))].map((perObjString:any)=>{return JSON.parse(perObjString)})
      this.countyTownSub.next({countyArr, townArr});
      console.log("do fetch");
    });
  }
}