import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Service } from './service/service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmregistrationComponent } from './confirmregistration/confirmregistration.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserticketsComponent } from './usertickets/usertickets.component';
import { ServiceComponent } from './service/service.component';
import { TicketComponent } from './ticket/ticket.component';
import { HomeComponent } from './home/home.component';
import { ConfirmTicketComponent } from './confirm-ticket/confirm-ticket.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllticketsComponent } from './alltickets/alltickets.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminticketviewComponent } from './adminticketview/adminticketview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ConfirmregistrationComponent,
    HomeComponent,
    AdminHomeComponent,
    UserticketsComponent,
    ServiceComponent,
    TicketComponent,
    HomeComponent,
    ConfirmTicketComponent,
    AllticketsComponent,
    AdminticketviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
