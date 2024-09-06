import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  isLoding :boolean = false;

              // owl

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
  rtl: true
}

              // owl


  myProduct!: Product; // from interface

      // 3# خدت نسخة من ActivatedRoute
  constructor (private _ProductService:ProductService, private _ActivatedRoute:ActivatedRoute, private _CartService:CartService, private toastr:ToastrService) {
    // ActivatedRoute  عشان ارجع ID بتاع العنصر المطلوب

  }
  ngOnInit(): void {
        // 4# .paramMap  عشان ترجع Product
    this._ActivatedRoute.paramMap.subscribe((res:any) => { //  paramMap  تبع ActivatedRoute   ID بتاع العنصر المطلوب
        // 5#  نبدا في العرض in html
      console.log(res);
      console.log(res.params.id);

      this._ProductService.getSpecProduct(res.params.id).subscribe({
        // هترجع Data بتعا العنصر صاحب هذا ID
        next: (res) => {
          console.log(res);
              // 5#
          this.myProduct = res.data
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

  addProduct(pID:string) {
    this.isLoding = true;

    this._CartService.addProductToCart(pID).subscribe({
      next: (res) => {
        // subscribe   .next(res.numOfCartItems)
        this._CartService.cartNum.next(res.numOfCartItems)

        this.isLoding = false;
        console.log(res);
        console.log(res.numOfCartItems);
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.isLoding = false;
        console.log(err);
        this.toastr.error(err.message);
      }
    })
  }

}
