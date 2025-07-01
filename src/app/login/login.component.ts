import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [InputTextModule, ButtonModule, PasswordModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private notification = inject(NotificationService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  login(){
    if(this.loginForm.invalid){
      this.notification.showError('Please fill in all fields correctly');
      return;
    }
    const user = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }
    this.auth.login(user.username, user.password).subscribe({
      next: () => {
        this.notification.showSuccess('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.notification.showError('Incorrect credentials');
      }
    });
  }
}
