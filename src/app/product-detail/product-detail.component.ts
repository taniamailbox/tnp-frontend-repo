import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product_id!: number;
  product_det!: any;
  selectedImage!: string;
  imageSize = 430;
  images: any[] = [];

  constructor(private products: ProductsService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.product_id = Number(params.get('id'));
      this.products.getProductById(this.product_id).subscribe(resData => {
        if(resData.status == 'success') {
          this.product_det = resData.data;
          this.images = Object.entries(this.product_det.images);
          this.selectedImage = this.images[0][1];
        }
      });
    });    
  }

  changeimage(image: string){
    this.selectedImage = image;
  }

  changeColor(e: any) {
    let sel_car: any = this.images.filter(img => img[0] == e.target.value);
    this.selectedImage = sel_car.length?sel_car[0][1]:'';
  }
}
