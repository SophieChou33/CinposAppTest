import {
  Component,
  inject,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faHouseChimneyWindow, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class OffcanvasComponent {
  activeNav: string = '';
  navClick(navName: string) {
    this.activeNav = navName;
  }
  private offcanvasService = inject(NgbOffcanvas);

  openNoKeyboard(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { keyboard: false });
  }
  // fontawesome
  faBars = faBars;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faMapMarkerAlt = faMapMarkerAlt;
}
