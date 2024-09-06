// ng g interceptor header
//  اي request بابعته بيعدي على interceptor
import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // req   ==  اي request  راجع هتعمل عليه العمليات الاتية

  if(typeof localStorage !== 'undefined' ) { //   To brawser or server
    if(localStorage.getItem("userToken") !== null ) {

      req = req.clone({ //  خدت من interceptor نسخة
        setHeaders: {'token':localStorage.getItem("userToken")!}
        // كده اي request معدي  بيعدي على interceptor ده  وبيعمله  setHeaders
      })
    }
  }

  return next(req);  //  يرجعه عشان استخدمه في اي مكان
  // هنروح الى  app.config

  // هروح لكل services  مستخدم فيها Token  وهستخدم header.interceptor
};
