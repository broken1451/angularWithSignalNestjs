import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterInterface } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {


  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get formsValue(): any {
    return this.form.controls;
  }

  public form: FormGroup = this.fb.group({
    name: ['test2', [Validators.required]],
    email: ['test2@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });





  register(): void {
    const body: RegisterInterface = {
      name: this.formsValue.name.value,
      email: this.formsValue.email.value,
      password: this.formsValue.password.value
    }
    console.log(body);
    this.authService.register(body).subscribe({
      next: (response) => {
        console.log({response});
        // this.router.navigate(['/dashboard']);
      },
      // error: (error) =>{
      //   console.error(error);
      //   Swal.fire('Error', error, 'error');
      // }
    })
  }
}
