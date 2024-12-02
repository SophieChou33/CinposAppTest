import { Component, Input } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hometable',
  templateUrl: './hometable.component.html',
  styleUrl: './hometable.component.css'
})
export class HometableComponent {
  @Input() calculatedObj: any = {};
  @Input() stationCount: number = 99;
  // fontawesome
  faMapMarkerAlt=faMapMarkerAlt
}
