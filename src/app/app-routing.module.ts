import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObjectsComponent} from './objects/objects.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';
import {AdminGuard} from './login/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Objects', component:  ObjectsComponent, canActivate: [AuthGuard]},
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard]}, // [AdminGuard]
];

@NgModule({

  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
