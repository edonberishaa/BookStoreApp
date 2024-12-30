import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: 'edon@gmail.com',
    password: '12345',
    rememberMe: false
  };
  errorMessage: string = ''; // For displaying error messages
  passwordFieldType: string = 'password'; // Default type for password field
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.errorMessage = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.authService.login(this.loginData).subscribe(
      response => {
        const token = response.token;

        localStorage.setItem('authToken', token);

        const isAdmin = this.authService.isAuthenticated();
        const redirectRoute = '/add-book';
        this.router.navigate([redirectRoute]);
        alert('Successfully logged in!')
      },
      error => {
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login failed', error);
      }
    );
  }
} 
