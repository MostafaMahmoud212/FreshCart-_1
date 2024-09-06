import { Component, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Brands } from '../../../shared/interfaces/brands';
import { BrandsService } from '../../../shared/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CarouselModule, RouterLink, LowerCasePipe, UpperCasePipe, CurrencyPipe, OnsalePipe, FilterPipe, FormsModule, TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  brandsSub!: Subscription;
  brandsList: WritableSignal<Brands[]> = signal([])

  constructor(private BrandsService: BrandsService,  private toastr: ToastrService) {}

  ngOnInit() {
    // go to last page
    if (typeof localStorage !== "undefined" ) { // لو احنا على browser
      localStorage.setItem("currentPage", '/brands')
    }

    this.brandsSub = this.BrandsService.getAllBrands().subscribe({
      next:(res) => {
        // console.log(res.data);

        // for signal set()
        this.brandsList.set(res.data);
      },
      error: (err) => {
        // console.log(err);
      }
    })

  }

    // To unSubscribe
    ngOnDestroy() {
      this.brandsSub?.unsubscribe();
    }

}
