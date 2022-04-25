import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: false,
      authFormType: 'login'
    }
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: false,
      authFormType: 'register'
    }
  },
  {
    path: 'profile/edit',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: '/user/login',
      authFormType: 'edit-profile'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
