import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard/auth.guard';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DashComponent } from './components/dash/dash.component';

import { FormComponent } from './components/form/form.component';

import { LoginComponent } from './components/login/login.component';
import { CreateLeadsComponent } from './myleads/create-leads/create-leads.component';
import { EditLeadsComponent } from './myleads/edit-leads/edit-leads.component';
import { LeadsListComponent } from './myleads/leads-list/leads-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RegisterComponent } from './components/register/register.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
 
  {
    path:'changepassword',
    component:ChangepasswordComponent,
   
  },
  {
    path:'dash',
    component:DashComponent
  },
 /* {
    path:'sidenavbar',
    component:SidenavbarComponent
  },
  {
    path:'navbar',
    component:NavbarComponent
  },
  
  {
    path:'dash',
    component:DashComponent
  },*/
  {
    path:'form',
    component:FormComponent
  },
  {
    path:'leads',
    component:LeadsListComponent
  },
  {
    path:'create-leads',
    component:CreateLeadsComponent
  },
  {
    path:'edit-leads',
    component:EditLeadsComponent
  },
  {
    path:'leads-list',
    component:LeadsListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
