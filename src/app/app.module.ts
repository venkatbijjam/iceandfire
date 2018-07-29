import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';

import { RouterModule, Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IceandfireService } from './iceandfire.service';
import { BookviewComponent } from './bookview/bookview.component';
import { CharactorviewComponent } from './charactorview/charactorview.component';
import { HouseviewComponent } from './houseview/houseview.component';
import {AtomSpinnerModule} from 'angular-epic-spinners';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    DetailsComponent,
    BookviewComponent,
    CharactorviewComponent,
    HouseviewComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AtomSpinnerModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    ToastrModule.forRoot(),

    RouterModule.forRoot([
     
      { path: 'view', component: ViewComponent },
      {path:'', redirectTo:'view',pathMatch:'full'},
      {path:'book/:url',component:BookviewComponent},
      {path:'charactor/:url',component:CharactorviewComponent},
      
      {path:'charactor/:url/:detail',component:CharactorviewComponent},
      {path:'house/:url',component:HouseviewComponent},
      {path:'house/:url/:detail',component:HouseviewComponent},
      
      {path:'details/:url',component:DetailsComponent}
     
    ])
  ],
  providers: [IceandfireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
