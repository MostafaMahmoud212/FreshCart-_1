import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  // To unSubscribe
  logSub!: Subscription;

  show:boolean = false;

  isLogin:boolean = false;


  errorMsg!: string

  constructor(private _auth:AuthService,private _Router:Router) {}

        // in signup in API
  loginForm:FormGroup = new FormGroup( {
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)]),

  })


  sendData() {

    this.isLogin = true;

    this.logSub =  this._auth.sendLogin(this.loginForm.value).subscribe({
      next:(res) => {
        // console.log(res);
        this.isLogin = false;

        // #2
        localStorage.setItem("userToken", res.token)
        // #3 decodeUserData() in auth.services.ts

        this._auth.decodeUserData(); // لفك token

        // عشان يوديني عند اخر صفحة كنت فيها
        if (localStorage.getItem("nvigateTo") !  == null ) {
          this._Router.navigate([localStorage.getItem("nvigateTo")])
        }
        else {
          this._Router.navigate(['/home']);
        }

      },
      error:(err) => {
        this.errorMsg = err.error.errors.msg;
        this.isLogin = false;
      }
    })

  }

  ngOnDestroy(): void {
    this.logSub?.unsubscribe();
  }

}
