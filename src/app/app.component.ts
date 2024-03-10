import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_tpn_frontend';
  userToken!:any;
  uName!:any;

  constructor(private router: Router, private pdt: ProductsService) {
    this.pdt.loggedinUser.subscribe(data => {
      this.userToken = data.userToken || null;
      this.uName = data.uName || null;
    })
  }

  logout() {
    localStorage.clear();
    this.pdt.loggedinUser.next({
      userToken: null,
      uName: null
    });
    window.location.href = this.router.url;
  }

  is_home() {
    return window.location.pathname == '/'?true:false;
  }
}
