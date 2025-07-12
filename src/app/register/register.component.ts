import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styles: [`
    .container {
      width: 80vw;
    }
    @media (min-width: 576px) {
      .container {
        width: 80vw;
      }
    }
    @media (min-width: 768px){
      .container{
        width: 60vw;
      }
    }
    @media (min-width: 992px){
      .container{
        width: 70vw;
      }
    }
    @media (min-width: 1200px){
      .container{
        width: 50vw;
      }
    }
  `]
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private notification = inject(NotificationService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  register() {
    if (this.registerForm.invalid) {
      this.notification.showError('Please fill in all fields correctly');
      return;
    }

    const user = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    this.auth.register(user.username, user.email, user.password).subscribe({
      next: () => {
        this.notification.showSuccess('Registration successful');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.notification.showError('User already exists');
      },
    });
  }
}
