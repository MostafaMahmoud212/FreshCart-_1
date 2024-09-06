import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslationService } from '../../../shared/services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],   //  #8 Translation
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  myToken:any;
  myCart!: Cart;
  numOfItemsCart!:string;
  cartItem!:number;


  isLogin: boolean = false;
  constructor(
    private flowbiteService: FlowbiteService,
    private _AuthService:AuthService,
    private _router:Router,
    private _CartService:CartService,
    private _Translation:TranslationService,
  ) {}

  ngOnInit(): void {

    //  By subscribe
    this._CartService.cartNum.subscribe((res) =>  {
      this.cartItem = res;
    })

    this._CartService.getCart().subscribe( {
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: (err) => {
        // console.log(err);
      }
    })

  this.myToken = {"token": localStorage.getItem('userToken')};

    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });

    this._AuthService.UserData.subscribe(() => {    // *******
      if ( this._AuthService.UserData.getValue() !== null) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }

    })


    this._CartService.getCart().subscribe( {
      next: (res) => {
        // console.log(res);
        // console.log(res.data.products.length.toString());

        this.myCart = res;
        this.numOfItemsCart = res.data.products.length.toString()
      },
      error: (err) => {
        // console.log(err);
      }
    })

  }
  signOut() {
    // remove user token
    localStorage.removeItem('userToken')

    // userData
    this._AuthService.UserData.next(null)
    // login
    this._router.navigate(["/login"])
  }


  ngOnChanges(): void {
    this.myCart
  }

  // #8 in translation  one time in Dropdown
  ChangeLang(lang:string) { //  ولازم تعمل import  TranslateModule
    this._Translation.changLang(lang)
  }
}
