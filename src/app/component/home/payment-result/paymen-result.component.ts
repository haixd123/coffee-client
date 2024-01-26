import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit,OnDestroy {

  subscription : Subscription = null;
  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public datePipe: DatePipe,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.activeRoute.paramMap.subscribe({
      next: res =>{
        const params = new HttpParams()
      .append("vnp_ResponseCode",res.get("vnp_ResponseCode"))
      .append("billId",localStorage.getItem("billId"));
      this.api.getVnPaymentInfo(params).subscribe({
        next: res =>{
          // sau khi thanh toán thành công thì call api tạo bill , m thấy không đáng ra là phải tạo từ lúc nhập form rồi  h lấy đâu ra thông tin người dùng mà tạo =))
            if(res.status == "OK"){
              localStorage.removeItem("cartItems");
            }
        }
      })
      }
    });

  }

  linkToCoffee() {
    this.router.navigate(['/home/coffee-bean']);
  }

}
