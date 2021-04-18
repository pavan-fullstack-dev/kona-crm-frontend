import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptorService} from './services/tokeninterceptor.service';
import { AuthGuard} from './authguard/auth.guard';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

import { DashComponent } from './components/dash/dash.component';
import { FormComponent } from './components/form/form.component';
import { CreateLeadsComponent } from './myleads/create-leads/create-leads.component';
import { EditLeadsComponent } from './myleads/edit-leads/edit-leads.component';
import { LeadsListComponent } from './myleads/leads-list/leads-list.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    SidenavbarComponent,
    NavbarComponent,
    ChangepasswordComponent,

    DashComponent,
    FormComponent,
    CreateLeadsComponent,
    EditLeadsComponent,
    LeadsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true,
    
  }],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
