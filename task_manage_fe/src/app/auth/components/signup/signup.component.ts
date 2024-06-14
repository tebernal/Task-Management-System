import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { FormBuilder, FormGroup,FormControl, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DemoAngularMaterialModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm! : FormGroup;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,      // Inject AuthService
    private snackbar: MatSnackBar,         // Inject MatSnackBar
    private router: Router                 // Inject Router
  ){
    this.signupForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    console.log(this.signupForm.value)
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if(password !== confirmPassword){
        this.snackbar.open("Password do not match", "Close", {duration: 5000, panelClass: "error-snackbar" });
        return;
    }

    this.authService.signUp(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.snackbar.open("Signup successful", "Close", {duration: 5000});
        this.router.navigateByUrl("/login");
      }else{
        this.snackbar.open("Signup failed. Try again", "Close", { duration: 5000, panelClass:"error-snackbar"})
      }
    })
  }
}
