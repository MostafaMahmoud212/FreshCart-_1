import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CheckoutComponent } from '../additions/checkout/checkout.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CheckoutComponent, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  isLoding1!: boolean
  isLoding2!: boolean
  myCart!: Cart;
  AllProducts!:number

  constructor(private _CartService:CartService, private toastr: ToastrService) {}

  ngOnInit() {
    // go to last page
    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", '/cart')
    }


    this._CartService.getCart().subscribe( {
      next: (res) => {
        // console.log(res);
        this.AllProducts = res.data.products.length;
        this.myCart = res;


      },
      error: (err) => {
        // console.log(err);
      }
    })

  }

  updateQuantity(pID: string, pCoutn:number) {
    this._CartService.updateProductQuantity(pID, pCoutn.toString()).subscribe({
      next:(res) => {
        // console.log(res);

        // After removing  updat cart
        this._CartService.cartNum.next(res.numOfCartItems);
        this.AllProducts = res.data.products.length;

        this.myCart = res;
        this.toastr.success("cart updated");
      },
      error:(err) => {
        // console.log(err);
        this.toastr.error("cart updated");
      }
    })
  }

  removeProduct(pId:string ) {
    this.isLoding1 = true;
    this._CartService.removeSpecItem(pId).subscribe({
      next:(res) => {
        this.myCart = res;
        // console.log(res);

        this.toastr.error("item Deleted");

        // After removing  updat cart
        this._CartService.cartNum.next(res.numOfCartItems);
        this.AllProducts = res.data.products.length;

        this.isLoding1 = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoding1 = false;
      }
    })
  }

  removeAllProduct() {
    this.isLoding2 = true;
    this._CartService.clearCart().subscribe({
      next:(res) => {
        this.myCart = res;
        // console.log(res);

        this.toastr.error("All Cart Deleted");
        // After removing  updat cart
        this._CartService.cartNum.next(0)

        this.isLoding2 = false;
      },
      error: (err) => {
        // console.log(err);
        this.isLoding2 = false;
      }
    })
  }

}


