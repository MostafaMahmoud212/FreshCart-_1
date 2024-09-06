import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './layout/additions/forgot-password/forgot-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/pages/additions/checkout/checkout.component';
import { WishlistComponent } from './layout/additions/wishlist/wishlist.component';
// import { CategoriesDetailsComponent } from './layout/additions/categories-details/categories-details.component';
// import { BrandsDetailsComponent } from './layout/additions/brands-details/brands-details.component';

export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full", title: "Home"},
  {path: "home", component: HomeComponent, canActivate:[authGuard], title: "Home"}, // canActivate:[authGuard]  ال gard اللى بيحميها
  {path: "login", component: LoginComponent, title: "login"},
  {path: "register", component: RegisterComponent, title: "register"},
  {path: "product", component: ProductsComponent, canActivate:[authGuard], title: "product"},
  //  loadComponent  Is a lazy loading   بتتعمل على مستوى  component على الصفحات اللى usdr مش هيزورها كتير
  {path: "brands", loadComponent: () => import("./layout/pages/brands/brands.component").then((c) => c.BrandsComponent), canActivate:[authGuard], title: "brands"},
  {path: "categories", loadComponent: () => import("./layout/pages/categories/categories.component").then((c) => c.CategoriesComponent), canActivate:[authGuard], title: "categories"},
  {path: "cart", component: CartComponent, canActivate:[authGuard], title: "cart"},
      // 2# "productDetails/:id"
  {path: "productDetails/:id", component: ProductDetailsComponent, canActivate:[authGuard], title: "productDetails"},
  //  "productDetails/:id"  عشان url بتاعه هيكون فيه id   وممكن تسميه باي اسم تاني
  // 3# in product-details.component.ts

  {path: "forgetPassword", component: ForgotPasswordComponent, title: "forgetPassword"},
  {path: "checkout/:ide", component: CheckoutComponent, canActivate:[authGuard], title: "checkOut"},
  {path:"wishlist",component:WishlistComponent,canActivate:[authGuard],title:"wishlist"},
  {path: '**', component: NotFoundComponent}
];
