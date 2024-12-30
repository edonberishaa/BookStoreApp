import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://localhost:7147/';
  private tokenKey = 'your-secret-key-here-at-least-16-bytes';  // Make sure this is consistent across the app

  constructor(private http: HttpClient, private router: Router) { }

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}Auth/login`, credentials);
  }

  // Check if the user is authenticated (i.e., has a token)
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  // Logout method
  logout() {
    localStorage.removeItem(this.tokenKey);  // Use 'authToken' to remove the correct token
    this.router.navigate(['/login']);
  }
}
