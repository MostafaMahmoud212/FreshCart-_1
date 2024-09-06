import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loawderInterceptor: HttpInterceptorFn = (req, next) => {

  let spinner: NgxSpinnerService = inject(NgxSpinnerService)
  // جايبها من loawder.interceptor
  spinner.show();  //  اعمل show قبل ما req  ييجي

  return next(req).pipe(finalize(() => { //  اعمل hide بعد ما req  ييجي
    spinner.hide();
  }))
};
