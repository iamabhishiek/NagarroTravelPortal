import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from './userservice/userservice';
import { SuccessticketComponent } from './successticket/successticket.component';
import { TicketraisedComponent } from './ticketraised/ticketraised.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewticketsComponent } from './viewtickets/viewtickets.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import {AuthGuardService} from './auth-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewticketComponent } from './viewticket/viewticket.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import {MatSortModule} from '@angular/material/sort'
import { MatTableModule} from '@angular/material/table';
import { AdminticketviewComponent } from './adminticketview/adminticketview.component'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SuccessticketComponent,
    TicketraisedComponent,
    HomepageComponent,
    ViewticketsComponent,
    AdminhomepageComponent,
    ViewticketComponent,
    AdminticketviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatButtonModule ,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
