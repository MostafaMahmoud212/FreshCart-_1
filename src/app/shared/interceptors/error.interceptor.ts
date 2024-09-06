//  Handel Errors

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let toster: ToastrService = inject(ToastrService)  //  لو اي Error رجع في اي مكان هيحطه في toster
  return next(req).pipe(catchError((err) => { //  لو جه error  هتعمله catche  بواسطة  pipe  هعمل pipe بعد ما req ييجي


    // console.log(err);
    // toster.error(err.error.message) //  لو اي Error رجع في اي مكان هيحطه في toster

    // في error موجود ثابت  هحله  You are not logged in. Please login to get access
    return throwError(() => err)
  }))
  // هروح استخدمه في app.config.ts
};
