import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: AuthComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: AuthComponent
  },
  {
    path: 'edit-profile',
    pathMatch: 'full',
    component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
