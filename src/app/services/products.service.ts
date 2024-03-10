import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  backendUrl: string = environment.backendUrl;
  loggedinUser = new ReplaySubject<any>(1);
  products: any[] = [
    {
      "id": 1,
      "brand": "Mercedes-Benz",
      "model": "Citan",
      "car body": "van",
      "color": "red",
      "discPrice": "10000$",
      "price": "20000$",
      "year": 2010,
      "images": {
        blue: "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg",
        red: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7kMTzkuQ6jTs97l2EI2BpoxWeI--XzeHUgagclb8BcB_plCK83w2Ihmslg&s",
        green: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2PsoC3Q-47wfhE0cV294ywPNAr6ajMGaOw&s"
      }     
    },
    {
      "id": 2,
      "brand": "Lexus",
      "model": "GX",
      "car body": "4WD",
      "color": "black",
      "discPrice": "50000$",
      "price": "60000$",
      "year": 2020,
      "images": {
        blue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFxEAq24GtbOrzYSTOGJzRp9JqXDIWGDdHi6M5l5cUmWbIgOG_8zGdwrJHvAGUIKKQdA0&usqp=CAU",
        red: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIVlfJZJjWtCqD-C0lbWp2AXSJDVAW6Uwabw&s",
        green: "https://imgd.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg"
      }
    },
    {
      "id": 3,
      "brand": "Toyota",
      "model": "RAV4",
      "car body": "crossover",
      "color": "gray",
      "discPrice": "15000$",
      "price": "16000$",
      "year": 2015,
      "images": {
        blue: "https://imgd.aeplcdn.com/370x208/n/cw/ec/106815/creta-exterior-right-front-three-quarter-4.png",
        red: "https://global.toyota/pages/news/images/2020/06/08/1330/001.jpg",
        green: "https://www.carscoops.com/wp-content/uploads/2023/09/2024-Toyota-Rav4-Woodland-1.jpg"
      }
    },
    {
      "id": 4,
      "brand": "Hyundai",
      "model": "Grand i10 Nios",
      "car body": "hatchback",
      "color": "yellow",
      "discPrice": "30000$",
      "price": "40000$",
      "year": 2018,
      "images": {
        blue: "https://i.pinimg.com/originals/ba/b0/de/bab0dec4f24ebe1b9b9b665f0ef0d075.jpg",
        red: "https://i.ytimg.com/vi/vUWztXSdTLE/maxresdefault.jpg",
        green: "https://imgd.aeplcdn.com/370x208/n/cw/ec/144851/exter-exterior-right-front-three-quarter-29.jpeg"
      }
    },
    {
      "id": 5,
      "brand": "Honda",
      "model": "Civic",
      "car body": "sedan",
      "color": "blue",
      "discPrice": "25000$",
      "price": "26000$",
      "year": 2010,
      "images": {
        blue: "https://imgd.aeplcdn.com/370x208/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-4.jpeg",
        red: "https://imgd.aeplcdn.com/370x208/n/2hiabsa_1459840.jpg?q=80",
        green: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP4ZI1GRXhJks7AoR3MbAnvHaUA7YLmQpSkvPeaGM7y3nDIWB_wZtuQ1mTuK1jvfNOB6w&usqp=CAU"
      }
    }
  ];

  constructor(private http: HttpClient) { 
    this.loggedinUser.next({
      userToken: localStorage.getItem('userToken'),
      uName: localStorage.getItem('name')
    });
  }

  getAllProducts() {
    //return this.http.get<{ status: string, message: string, data: any, count: number }>('https://reqres.in/api/cars');
    return of({
      status: "success",
      message: "Fetched Cars list",
      data: this.products 
    });
  }

  getProductById(id: number) {
    return of({
      status: "success",
      message: "Fetched Car details!",
      data: this.products?.find(car => car.id == id)
    });
  }

  userRegister(formObj: any) {
    return this.http.post<{ status: string, message: string, data: any }>(this.backendUrl + 'auth/register', formObj);
  }
  
  userLogin(formObj: any) {
    return this.http.post<{ status: string, message: string, data: any }>(this.backendUrl + 'auth/login', formObj);
  }
  
  getAllChatByUser() {
    return this.http.get<{ status: string, message: string, data: any }>(this.backendUrl + 'chat');
  }
  
  createChatByUser(formObj: any) {
    return this.http.post<{ status: string, message: string, data: any }>(this.backendUrl + 'chat', formObj);
  }
}
