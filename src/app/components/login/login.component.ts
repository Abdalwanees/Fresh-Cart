import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/srvices/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  login: FormGroup = this._FormBuilder.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/),
      ],
    ],
  });

  sendUserEmail: FormGroup = this._FormBuilder.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/)],
    ],
  });

  sendCode: FormGroup = this._FormBuilder.group({
    code: ['', [Validators.required]],
  });

  newPassword: FormGroup = this._FormBuilder.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/)],
    ],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/),
      ],
    ],
  });
  msg: string = '';

  forgetPasswordModel: boolean = false;
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;

  onSubmit() {
    if (this.login.valid) {
      this._AuthService.signIn(this.login.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            localStorage.setItem('userToken', res.token);
            console.log(this._AuthService.saveUserData());
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.msg = err.error.message;
        },
      });
    }
    else{
      this.login.markAllAsTouched();
    }
  }

  forgetPassword() {
    this.forgetPasswordModel = true;
    this.step1 = true;
  }
  closeForgetPassword() {
    this.forgetPasswordModel = false;
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
  }

  sendEmail() {
 if(this.sendUserEmail.valid){
  let email = this.sendUserEmail.value;
  this._AuthService.forgetPassword(email).subscribe({
    next: (res) => {
     if (res.statusMsg== 'success') {
      this.step1 = false;
      this.step2 = true;
      this.msg='';
     }
    
    },
    error: (err) => {
     // console.log(err);
      this.msg = err.error.message;
    },
  });
 }
 else{
  this.sendUserEmail.markAllAsTouched();
 }
  }

  resetCode(){ 
    const sendTheCode = this.sendCode.value.code.toString();
    console.log(sendTheCode);
    this._AuthService.sendCode(sendTheCode).subscribe({
      next:(res)=>{
       // console.log(res);
     
        this.step2 = false;
        this.step3 = true;
        this.msg='';
       
      },
      error:(err)=>{
        //console.log(err);
        this.msg = err.error.message;
      }
    })
  }

  newpassword(){
   if(this.newPassword.valid){
    let password = this.newPassword.value;
    this._AuthService.resetPAssword(password).subscribe({
      next:(res)=>{
        if(res.token){
          localStorage.setItem('userToken',res.token);
          this._Router.navigate(['/home']);
        }
      },
      error:(err)=>{
        console.log(err);
        this.msg = err.error.message;
      }
    })

   }
   else{
    this.newPassword.markAllAsTouched();
   }
  }
}
