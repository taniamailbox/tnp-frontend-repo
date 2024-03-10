import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent {
  cars: any[] = [];
  carsBkp: any[] = [];
  p: number = 1;
  itemsPerPage: number = 3;

  constructor(private products: ProductsService) {
    this.getAllCars();
  }

  getAllCars() {
    this.products.getAllProducts().subscribe(resData => {
      if(resData?.status == 'success') {
        this.cars = resData.data?.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);
        this.carsBkp = resData.data;
      }
    });
  }
  
  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  applyFilter(e:any) {
    const filterValue = (e.target as HTMLInputElement).value;
    let search_str = filterValue.trim().toLowerCase();
    if(search_str != '') {
      this.cars = this.carsBkp?.filter(car => car?.brand?.toLowerCase().indexOf(search_str) > -1 || car?.model?.toLowerCase().indexOf(search_str) > -1 || car?.price?.indexOf(search_str) > -1 || car?.year.toString().indexOf(search_str) > -1)
    } else {
      this.getAllCars();
    }
  }

  pageChanged(e: number) {
    this.p = e;
    let allCars:any[] = this.carsBkp;
    this.cars = allCars?.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);  
  }

}
