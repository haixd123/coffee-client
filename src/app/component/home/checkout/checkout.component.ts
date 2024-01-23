import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../../services/api';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItem: any;
  totalQuantity = 0;
  totalPrice = 0;
  formAdd: FormGroup;
  radioValue = 1;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router,
    public datePipe: DatePipe,
    private renderer: Renderer2
  ) {
    this.formAdd = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      detail: null,
      payments: 1,
      createDate: null,
      total: null,
    });
  }

  ngOnInit(): void {
    this.cartItem = JSON.parse(localStorage.getItem('cartItems'));
    // this.formAdd.get('payments').setValue(1);
    for (const item of this.cartItem) {
      this.totalQuantity += item.quantity;
      this.totalPrice +=
        (item.price - (item.price * item.discount) / 100) * item.quantity;
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const key in this.formAdd.controls) {
      this.formAdd.controls[key].markAsDirty();
      this.formAdd.controls[key].updateValueAndValidity();
    }
  }

  handleCheckout() {

    if (this.formAdd.valid) {
      //handle checkout
      const dataCart: any[] = [];
      let itemCart: any;
      for (const item of this.cartItem) {
        itemCart = 'name: ' + item.name + ',quantity: ' + item.quantity + ',price: ' + item.price + ',discount: ' + item.discount + '% ';
        dataCart.push(itemCart);
      }

      this.formAdd.get('detail').setValue(dataCart?.toString());
      this.formAdd.get('createDate').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
      this.formAdd.get('total').setValue(this.totalPrice);

      if (this.radioValue == 1) {
        this.api.createBill(this.formAdd.value).subscribe((res: any) => {
          alert('Bạn đã đặt hàng thành công');
          localStorage.removeItem('cartItems');
          this.router.navigate(['/home/product']);
        });
      } else {
        const total = {
          total: this.totalPrice,
        };
        this.formAdd.get('createDate').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
        this.formAdd.patchValue(total);
        this.api.createPaymentWithVnPay(this.formAdd.value).subscribe({
          next: (res) => {
            //??? de lam gi
            localStorage.setItem('billId', res.billId);
            const newTab = this.renderer.createElement('a');
            this.renderer.setProperty(newTab, 'href', res.url);
            const body = this.renderer.selectRootElement('body');
            this.renderer.appendChild(body, newTab);
            newTab.click();
            this.renderer.removeChild(body, newTab);
            localStorage.removeItem('cartItems');
          },
          error: (err) => {
          },
        });
      }
    }
  }
}
