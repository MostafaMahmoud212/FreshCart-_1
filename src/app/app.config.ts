import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loawderInterceptor } from './shared/interceptors/loawder.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

          // #5  in translation
function httpLoaderFactory(http:HttpClient) {  //  fucntion دورها انها تدور داخل ملفات اللغة على اللغة المطلوبة
  return new TranslateHttpLoader(http, "./assets/i18n/", '.json') //  ملفات اللغة هنا  i18n  اختصار ل inter nationalization  ملف  json اللى جواه
}


export const appConfig: ApplicationConfig = {
  // withViewTransitions()  عشان لما يتنفل من component الى اخر يبقى في smothe
  providers: [provideRouter(routes,
    withViewTransitions(),
    withInMemoryScrolling({scrollPositionRestoration:"top"})
    ),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      RouterModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,

      // #6
      TranslateModule.forRoot ( {
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      })
            // #7  in assets/i18n/en.json
            // #8  in navbar.ts

    ),
    provideToastr(), // Toastr

    // import هنا لكل interceptor
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor, loawderInterceptor]))
    // كده انا ربط اي request هيعدي على
  ]
  // withInMemoryScrolling عشان لما بتتنقل بين الصفحات يصفر scrol
};
