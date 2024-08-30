import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginInterface, LoginResponse } from '../interfaces/login.interface';
import { catchError, map, Observable, of, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { ErrorLoginResponse } from '../interfaces/error.login.interface.response';
import Swal from 'sweetalert2';
import { CheckTokenResponse } from '../interfaces/check-token.interface';
import { RegisterInterface, RegisterResponse } from '../interfaces/register.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly httpClient = inject(HttpClient);
    private _currentUser = signal<LoginResponse | CheckTokenResponse | RegisterResponse | null | undefined>(null);
    private _authStatus = signal<AuthStatus>(AuthStatus.checking);

    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus());

    constructor() { 
        this.checkAuthStatus().subscribe();
    }

    login(body: LoginInterface): Observable<LoginResponse | boolean> {

        return this.httpClient.post<LoginResponse>(`${environment.api}/auth/login`, body).pipe(
            tap((response: LoginResponse | null | undefined) => {
                // if (response) {
                //     this._currentUser.set(response);
                //     this._authStatus.set(AuthStatus.authenticated);
                //     localStorage.setItem('token', response.token);
                // }
                return this.setAuthentication(response);
            }),
            take(1),
            map(() => {
                return true;
            }),
            catchError((error: ErrorLoginResponse) => {
                return throwError(() => {
                    this._currentUser.set(null);
                    this._authStatus.set(AuthStatus.notAuthenticated);
                    localStorage.removeItem('token');
                    Swal.fire('Error', error.error.message, 'error');
                    return error.error.message;
                });
            })
        );
    }


    checkAuthStatus(): Observable<CheckTokenResponse | LoginResponse | RegisterResponse | boolean> {

        const token = localStorage.getItem('token');
        if (!token) {
            this.logout();
            return of(false);
        }

        const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.httpClient.get<CheckTokenResponse | LoginResponse | RegisterResponse>(`${environment.api}/auth/check-token`, { headers: header }).pipe(
            tap((response: CheckTokenResponse | LoginResponse | RegisterResponse | null | undefined) => {
                // if (response) {
                //     this._currentUser.set(response);
                //     this._authStatus.set(AuthStatus.authenticated);
                //     localStorage.setItem('token', response.token);
                // }
                return this.setAuthentication(response);
            }),
            take(1),
            map(() => {
                return true;
            }),
            catchError(() => {
                this._authStatus.set(AuthStatus.notAuthenticated);
                return of(false);
            })
        );
    }


    private setAuthentication(response: LoginResponse | CheckTokenResponse | RegisterResponse | null | undefined, token?: string): CheckTokenResponse | LoginResponse | RegisterResponse | boolean | null | undefined {
        this._currentUser.set(response);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', response!.token);
        return response;
    }

    logout(): void {
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
        localStorage.removeItem('token');
    }

    register(body: RegisterInterface): Observable<RegisterResponse | boolean> {

        return this.httpClient.post<RegisterResponse>(`${environment.api}/auth/register`, body).pipe(
            tap((response: RegisterResponse) => {
                // if (response) {
                //     this._currentUser.set(response);
                //     this._authStatus.set(AuthStatus.authenticated);
                //     localStorage.setItem('token', response.token);
                // }
                return this.setAuthentication(response);
            }),
            take(1),
            map(() => {
                return true;
            }),
            catchError((error: ErrorLoginResponse) => {
                return throwError(() => {
                    this._currentUser.set(null);
                    this._authStatus.set(AuthStatus.notAuthenticated);
                    localStorage.removeItem('token');
                    Swal.fire('Error', error.error.message, 'error');
                    return error.error.message;
                });
            })
        );
    }

}