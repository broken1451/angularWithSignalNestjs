import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsAuthPageComponent } from './layouts-auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsAuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutPageRoutingModule { } 
