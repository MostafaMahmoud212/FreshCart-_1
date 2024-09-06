import { Component, inject } from "@angular/core";

import { CurrencyPipe, UpperCasePipe } from "@angular/common";
import { WishlistService } from "../../../shared/services/wishlist/wishlist.service";
import { CartService } from "../../../shared/services/cart/cart.service";
import { Product } from "../../../shared/interfaces/product";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { TranslateModule} from "@ngx-translate/core";
import { OnsalePipe } from "../../../shared/pipe/onsale.pipe";



@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TranslateModule, OnsalePipe, UpperCasePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  productsWishlist: Product[] = [];
  LoggedWishlistSubscription!:Subscription
  removeWishlistSubscription!:Subscription

  ngOnInit(): void {
    this.LoggedWishlistSubscription = this._WishlistService.getLoggedUserWishlist().subscribe({
      next: res => {
        this.productsWishlist = res.data;
        // console.log(this.productsWishlist);
      }
    });
  }
  addProductCart(productId: string): void {
   this._CartService.addProductToCart(productId).subscribe({
     next: res => {
       // console.log(res);
       this._CartService.cartNum.next(res.numOfCartItems);
     },error:(err)=>{

     }
   })
  }
  removeProductWishlist(productId: string): void {
    this.removeWishlistSubscription = this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        // console.log(res);
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: res => {
            this.productsWishlist = res.data;
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    // unsubscribe to prevent memory leak.
    this.LoggedWishlistSubscription?.unsubscribe();
    this.removeWishlistSubscription?.unsubscribe();
  }

}

