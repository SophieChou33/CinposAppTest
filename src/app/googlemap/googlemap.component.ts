import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
})
export class GooglemapComponent implements OnInit {
  @Input() locationObj: { lat: number; lng: number } = { lat: 0, lng: 0 };
  @Input() stationName: string = "";
  markerName:string = this.stationName+"氣象站";

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stationName']) {
      this.markerName = this.stationName + "氣象站";
    }
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: this.locationObj.lat,
    lng: this.locationObj.lng,
  };
  zoom = 8;
  map: google.maps.Map | undefined;
  ngOnInit(): void {
    this.center = { lat: this.locationObj.lat, lng: this.locationObj.lng };

    setTimeout(()=>{
      if (this.map) {
        this.map.setZoom(12);
      }
    }, 100)
  }
  mapOk(map: google.maps.Map): void {
    this.map = map;
    map.setZoom(this.zoom);
  }

  clickMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
    this.markerName = "經度： "+this.locationObj.lat+"\r緯度： "+this.locationObj.lng
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
