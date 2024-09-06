import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from './../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, LowerCasePipe, NgStyle, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgStyle,CarouselModule, RouterLink, LowerCasePipe, UpperCasePipe, CurrencyPipe, OnsalePipe, FilterPipe, FormsModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnDestroy {
private readonly _WishlistService= inject(WishlistService)
  // TO un subscribe
  ProductToWishlistSubscription!: Subscription
  productSub!: Subscription;

  serchTerm: string = '';

  isLoding :boolean = false;

            // from  owl
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    rtl: true,
  }
            // from  owl



      // use signal
      productList: WritableSignal<Product[]> = signal([])
      // use signal

  // productList: Product[] = []
  constructor(private _productService: ProductService, private _CartService:CartService, private toastr: ToastrService) {}

  ngOnInit() {

    // go to last page
    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", '/product')
    }

    // this.productSub  بيشيل subscribtion اللى راجعلك
    this.productSub = this._productService.getAllProducts().subscribe({
      next:(res) => {
        // console.log(res.data);

        // for signal set()
        this.productList.set(res.data);
      },
      error: (err) => {
        // console.log(err);
      }
    })
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
  // To unSubscribe
  ngOnDestroy() {
    this.productSub?.unsubscribe();
  }

}

