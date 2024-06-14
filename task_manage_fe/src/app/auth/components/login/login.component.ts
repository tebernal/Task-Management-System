import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corrected to styleUrls
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,      // Inject AuthService
    private snackbar: MatSnackBar,         // Inject MatSnackBar
    private router: Router                 // Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  signupPage(){
    this.router.navigateByUrl('/signup');
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt); // Assuming the token field is named 'token'

        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (StorageService.isEmployeeLoggedIn()) {
          this.router.navigateByUrl('/employee/dashboard');
        }

        this.snackbar.open('Login successful', 'Close', { duration: 5000 });
      } else {
        this.snackbar.open('Invalid credentials', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    }, error => {
      console.error(error);
      this.snackbar.open('Invalid credentials', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    });
  }
}
