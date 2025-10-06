import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  standalone:true,
  styleUrls: ['./auth.scss'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class AuthComponent {
  isLoginMode = true; // toggle between login and register

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    // Login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Register form
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {

    
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.auth.saveToken(res.access_token); // save JWT
          this.router.navigate(['/dashboard']); // navigate
        },
        error: (err) => alert('Login failed')
      });
      
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Registration successful! Please login.');
          this.toggleMode();
        },
        error: () => alert('Registration failed')
      });
    }
  }
}
