import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule], // #1 عملت import عشان استخدمها تحت وانا بعمل نسخة جديدة
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent  {

  userNamee!: string;
  isLogin:boolean = false;

  isErrorMsg: boolean = false;
  errorMsg!: string;

  constructor(private _auth:AuthService,private _Router:Router) {}

        // in signup in API
  registerForm:FormGroup = new FormGroup( {  // #2 خت نسخة جديدة من FormGroup عشان اعمل form بحسب البيانات اللى محتاجها API
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]), // validation   (requied) => يعني مطلوبة
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}/)]), // pattern => بتكتب جواها pattern اللى انت عايزها
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),

  }, this.checkPasswordData)  //  هديله parameter تاني   checkPasswordData


  sendData():void {

    this.isLogin = true;
    this._auth.sendRegister(this.registerForm.value).subscribe({
      next:(res) => {
        // console.log(res);
        // console.log(res.user.name);
        this._Router.navigate(['/login']);

        this.isLogin = false;
        this.userNamee = res.user.name;
      },
      error:(err) => {
        this.errorMsg = err.error.errors.msg;
        this.isErrorMsg = true;

        this.isLogin = false;
      }
    })

  }


  checkPasswordData(form:any) {
    if(form.get('password').value === form.get('rePassword').value) {
      return null
    }
    else {
      return {"passwordMatch": true}
    }
  }
}
