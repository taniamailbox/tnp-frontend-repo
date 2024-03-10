import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup!: FormGroup;
  message!: string;

  constructor(private fb: FormBuilder, private pdtService: ProductsService, private router: Router) {
    let userToken: any = localStorage.getItem('userToken');
    if(userToken) {
      this.router.navigate(['/']);
    }
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.maxLength(120), Validators.required]),
      password: new FormControl('', [Validators.maxLength(120), Validators.required]),
    });
  }

  submitForm(form:FormGroup) {
    if(form.valid) {
      let formObj = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.password,
      };
      this.pdtService.userLogin(formObj).subscribe(resData => {
        if(resData.status == 'success') {
          this.message = resData.message;
          localStorage.clear();
          if(resData?.data) {
            this.pdtService.loggedinUser.next({
              userToken: resData.data?.token,
              uName: resData.data?.user.name
            });
            localStorage.setItem('userToken', resData.data?.token);
            localStorage.setItem('name', resData.data?.user.name);
            this.router.navigate(['/']);

          }          
        }
      }, err => {
        this.message = err?.error?.message;
      })
    }
  }
}
