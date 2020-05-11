import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmregistrationComponent } from './confirmregistration/confirmregistration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TicketComponent } from './ticket/ticket.component';
import { HomeComponent } from './home/home.component';
import { ConfirmTicketComponent } from './confirm-ticket/confirm-ticket.component';
import { UserticketsComponent } from './usertickets/usertickets.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'register/:id', component: RegistrationComponent },
  { path: 'success/:id', component: ConfirmregistrationComponent },
  { path: 'forget', component: ForgotPasswordComponent },
  { path: 'ticket/:id', component: TicketComponent },
  { path: 'ticket/:id/:ticketId', component: TicketComponent },
  { path: 'homepage/:id', component: HomeComponent },
  { path: 'successticket/:id/:ticketId', component: ConfirmTicketComponent },
  { path: 'viewticket/:id', component: UserticketsComponent },
  { path: 'adminhomepage', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegistrationComponent,
  ConfirmregistrationComponent,
  ForgotPasswordComponent,
  HomeComponent,
  TicketComponent,
  ConfirmTicketComponent,
  UserticketsComponent,
  AdminHomeComponent,
];
