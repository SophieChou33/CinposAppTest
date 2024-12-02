import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hometable',
  templateUrl: './hometable.component.html',
  styleUrl: './hometable.component.css'
})
export class HometableComponent {
  @Input() calculatedObj: any = {};
}
