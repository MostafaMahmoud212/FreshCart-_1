import { Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, LowerCasePipe, NgStyle, UpperCasePipe } from '@angular/common';
import { Product } from '../../../shared/interfaces/product';
import { Subscription } from 'rxjs';
import { NavbarComponent } from "../../additions/navbar/navbar.component";
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle ,TranslateModule, NavbarComponent, RouterLink, LowerCasePipe, UpperCasePipe, CurrencyPipe, OnsalePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  productList: Product[] = []
  productSub!: Subscription;
  isLoding :boolean = false;
  ProductToWishlistSubscription!: Subscription
  private readonly _WishlistService= inject(WishlistService)


            // #3
  constructor (@Inject(PLATFORM_ID) private x:object, private _productService: ProductService, private _CartService:CartService, private toastr: ToastrService) {
  }

  ngOnInit() {

    this.productSub = this._productService.getAllProductsHome().subscribe({
      next:(res) => {
        // console.log(res.data);

        this.productList = res.data;
      },
      error: (err) => {
        // console.log(err);
      }
    })


    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", '/home')
    }
  }


  addProduct(pID:string) {
    this.isLoding = true;

    this._CartService.addProductToCart(pID).subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems)

        this.isLoding = false;
        // console.log(res);
        // console.log(res.numOfCartItems);
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.isLoding = false;
        // console.log(err);
        this.toastr.error(err.message);
      }
    })
  }

  addToWishlist(productId: string) {
    this.ProductToWishlistSubscription = this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message)
      }
    })
  }

  toggleFavorite(product: Product) {
    product.isliked = !product.isliked
  }
}
