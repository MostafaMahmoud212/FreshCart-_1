import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  isLoding: boolean = false;

  isErrorMsg: boolean = false;
  errorMsg!: string;

  isSendCodeForm: boolean = false;
  isResetDataForm: boolean = false;

  constructor(private _auth:AuthService, private _router:Router) {}

  emailForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  codeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  resetDataForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)])
  });


  sendEmail(){
    this.isLoding = true;
    this._auth.sendEmailApi(this.emailForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        if(res.statusMsg == 'success') {
          this.isLoding = false;
          this.isSendCodeForm = true;
        }
      },
      error: (err) => {
        // console.log(err.error.message);
        // this.emailErrorMsg = err.error.message
        this.isErrorMsg= true;
        this.errorMsg = err.error.message;
        this.isLoding = false;
      }
    })
    this.isErrorMsg= false;
  }


  sendCode(){
    this.isLoding= true;

    this._auth.sendCodeApi(this.codeForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        if(res.status == 'Success') {
          this.isSendCodeForm = false;
          this.isResetDataForm = true;
        }
        this.isLoding= false;
      },
      error: (err) => {
        // console.log(err.error.message);
        // this.codeErrorMsg = err.error.message
        this.isErrorMsg= true;
        this.errorMsg = err.error.message;
        this.isLoding= false;
      }
    })
    this.isErrorMsg= false;
  }

  resetData(){
    this.isLoding = true

    this._auth.resetDataApi(this.resetDataForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        this.isLoding = false;
        localStorage.setItem('userToken', res.token);

        this._auth.decodeUserData()
        this._router.navigate(['/home']);

      },
      error: (err) => {
        // console.log(err.error.message);
        this.isErrorMsg= true;
        this.errorMsg = err.error.message;
        this.isLoding = false;
      }
    })
    this.isErrorMsg= false;
  }

}
