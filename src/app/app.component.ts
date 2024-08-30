import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  public finishedAuthCkeck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });
  public isAuth = false;

  // los efectos son cunado una senal cambia de valor y se ejecuta una accion o se ejecuta una accion y cambia de valor la senal y tienen limpieza automatica
  public userChangeEffect = effect(() => {
    // console.log('first effect: ', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        this.isAuth = true
        return;
      case AuthStatus.authenticated:
        this.isAuth = true
        this.router.navigate(['/dashboard']);
        return;
      case AuthStatus.notAuthenticated:
        this.isAuth = true
        this.router.navigate(['/auth/layout/login']);
        return;

    }
  });
}
