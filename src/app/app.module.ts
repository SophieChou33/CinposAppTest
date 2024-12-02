import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppComponent } from './app.component';
import { AppHeader } from './app-header/app-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickModalCenter } from './click-modal-center/click-modal-center.component';
import { QueryDatatable } from './qureyDatatable/qureyDatatable.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepannelComponent } from './homepage/homeparts/homepannel.component';
import { HometableComponent } from './homepage/homeparts/hometable.component';

@NgModule({
  providers: [
    provideHttpClient(withFetch(),),
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomepageComponent },
      { path: 'queryPage', component: QueryDatatable},
    ]),
    NgbModule,
    DataTablesModule, FontAwesomeModule,
    FormsModule,
    GoogleMapsModule,
  ],
  declarations: [
    AppComponent,
    AppHeader,
    ClickModalCenter,
    QueryDatatable,
    GooglemapComponent,
    HomepageComponent, HomepannelComponent, HometableComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }