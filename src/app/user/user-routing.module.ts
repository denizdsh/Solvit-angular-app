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
    data: { authRequired: false }
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthActivate],
    data: { authRequired: false }
  },
  {
    path: 'edit-profile',
    pathMatch: 'full',
    component: AuthComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: '/user/login'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
