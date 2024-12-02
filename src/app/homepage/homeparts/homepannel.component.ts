import { Component, Input } from '@angular/core';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepannel',
  templateUrl: './homepannel.component.html',
  styleUrl: './homepannel.component.css'
})
export class HomepannelComponent {
  @Input() mainColor: string = "";
  @Input() title: string = "";
  @Input() title02: string = "";
  @Input() value: number = -99;
  @Input() county: string = "";
  @Input() dateTime: string = "";
  // fontawesome
  faCloudSun = faCloudSun;

}
