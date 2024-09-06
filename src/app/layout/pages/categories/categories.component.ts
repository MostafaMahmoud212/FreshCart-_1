import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Categories } from '../../../shared/interfaces/categories';
import { CategoriesService } from '../../../shared/services/categories/categories.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, RouterLink, LowerCasePipe, UpperCasePipe, CurrencyPipe, OnsalePipe, FilterPipe, FormsModule, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnDestroy {

  // TO un subscribe
  categoriesSub!: Subscription;

  serchTerm: string = '';

  isLoding :boolean = false;

  // use signal
  categoriesList: WritableSignal<Categories[]> = signal([])

  constructor(private CategoriesService: CategoriesService, private _CartService:CartService, private toastr: ToastrService) {}



  ngOnInit() {
    // go to last page
    if (typeof localStorage !== "undefined" ) { // لو احنا على browser
      localStorage.setItem("currentPage", '/categories')
    }

    this.categoriesSub = this.CategoriesService.getAllCategories().subscribe({
      next:(res) => {
        console.log(res.data);

        // for signal set()
        this.categoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // To unSubscribe
  ngOnDestroy() {
    this.categoriesSub?.unsubscribe();
  }
}
