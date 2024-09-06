import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChecOutService } from '../../../../shared/services/checkout/chec-out.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  isloding: boolean = false;
  cartId:string = " "
  constructor(private _ChecOutService:ChecOutService, private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any) => {
      this.cartId = res.params.ide;

      // console.log(this.cartId);  //  66d08a8a6bbfdad4221f40af

    })
  }

  checkoutForm: FormGroup = new FormGroup ({
    datails: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  })

  checkoutApi(){
    this.isloding = true
    this._ChecOutService.checkOut(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        // console.log(res.session.url);
        window.open(res.session.url, "_self");
        this.isloding = false
      },
      error: (err) => {
        // console.log(err);
        this.isloding = false
      }
    })
  }
}

