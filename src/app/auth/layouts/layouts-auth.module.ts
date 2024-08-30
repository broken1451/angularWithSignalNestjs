import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsAuthRoutingModule } from './layouts-auth-routing.module';
import { LayoutsAuthPageComponent } from './auth-layout-page/layouts-auth-page.component';



@NgModule({
  declarations: [
    LayoutsAuthPageComponent
  ],
  imports: [
    CommonModule,
    LayoutsAuthRoutingModule
  ]
})
export class LayoutsAuthModule { }
