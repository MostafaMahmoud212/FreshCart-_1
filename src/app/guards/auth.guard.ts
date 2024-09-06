import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


// عملت auth.guard عشان ميدخلش اي حد على اي صفحة غير لما يعمل login
export const authGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router) // خدت نسخة من Router عن طريق inject

  if (localStorage.getItem('userToken') !== null) {
    return true;
  }
  else {
    // console.log(state);

    // عشان يوديني عند اخر صفحة كنت فيها
    localStorage.setItem("nvigateTo", state.url)

    return _router.navigate(['/login']);
  }
};
