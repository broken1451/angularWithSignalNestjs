import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { LoginResponse } from '../../auth/interfaces/login.interface';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

  private readonly authService = inject(AuthService);

  public userComputed = computed(() => this.authService.currentUser());

  // get user(): LoginResponse | null | undefined {
  //   return this.authService.currentUser();
  // }

  logout(){
    this.authService.logout();
  }
}
