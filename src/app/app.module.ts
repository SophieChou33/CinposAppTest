import { NgModule, ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeader } from './app-header/app-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickModalCenter } from './click-modal-center/click-modal-center.component';
import { ClickModalScroll } from './click-modal-scroll/click-modal-scroll.component';
import { QueryDatatable } from './qureyDatatable/qureyDatatable.component';

@NgModule({
  providers: [
    provideHttpClient(withFetch(),),
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AppHeader },
      { path: 'queryPage', component: QueryDatatable},
    ]),
    NgbModule,
    DataTablesModule, FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AppHeader,
    ClickModalCenter,
    ClickModalScroll,
    QueryDatatable,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/