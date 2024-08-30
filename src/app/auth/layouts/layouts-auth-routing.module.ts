import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsAuthPageComponent } from './auth-layout-page/layouts-auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsAuthPageComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../pages/login-page/login-page.module').then(m => m.LoginPageModule),
         pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('../pages/register-page/register-page.module').then(m => m.RegisterPageModule),
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'register'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsAuthRoutingModule { }
