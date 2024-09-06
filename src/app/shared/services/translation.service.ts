import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private _translate:TranslateService) {
    if ( typeof localStorage !== 'undefined' ) {

      // #1
      _translate.setDefaultLang("en") //  اول ما يفتح يكون Default Engulich

      const lang = localStorage.getItem("lang")
      if (lang) {
        // #2
        _translate.use("en") //  اللغة اللى user هيستخدمها
      }
    }
  }


  // #3
  changLang(lang:string) {

    localStorage.setItem("lang", lang)

    this._translate.use(lang);
    this.changDir();
  }


  // #4
  changDir() {
    if (localStorage.getItem("lang") == "ar" ) {
      document.dir = "rtl"
    }
    else if (localStorage.getItem("lang") == "en" ) {
      document.dir = "ltr"
    }
  }

  // #5  in app.config.js
}
