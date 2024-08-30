import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  public form: FormGroup = this.fb.group({
    email: ['test2@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  get formsValue(): any {
    return this.form.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    const body: LoginInterface = { 
      email: this.formsValue.email.value, 
      password: this.formsValue.password.value 
    };
    console.log(body);
    this.authService.login(body).subscribe({
      next: (response) => {
        console.log({response});
        this.router.navigate(['/dashboard']);
      },
      // error: (error) =>{
      //   console.error(error);
      //   Swal.fire('Error', error, 'error');
      // }
    })
    
  }
}
