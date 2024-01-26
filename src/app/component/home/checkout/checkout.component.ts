import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../services/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Voucher } from '../../admin/table-voucher/interface/voucher';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  openTableVoucher = false;
  currPage = 1;
  totalEle = 0;
  cartItem: any;
  totalQuantity = 0;
  totalPrice = 0;
  formAdd: FormGroup;
  radioValue = 1;

  myVoucher: Voucher[] = [];
  selectedVoucher: Voucher;
  // selectedVoucher: Voucher = {
  //   id: 'SHDFEJ',
  //   description: 'Sales 20%',
  //   percentDiscount: 10,
  //   voucherType: 1,
  //   maxDiscount: 20000,
  //   createdAt: '',
  //   expiredAt: '',
  // };

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router,
    public datePipe: DatePipe,
    private renderer: Renderer2,
    private storage: TokenStorageService
  ) {
    this.formAdd = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      billDetails: [],
      payments: 1,
      createDate: null,
      total: null,
      // voucherIds: ['3S5D5F']
    });
  }

  ngOnInit(): void {
    // this.myVoucher = Array(9).fill(this.selectedVoucher);
    this.getMyVoucher();
    this.cartItem = JSON.parse(localStorage.getItem('cartItems'));
    // this.formAdd.get('payments').setValue(1);
    for (const item of this.cartItem) {
      this.totalQuantity += item.quantity;
      this.totalPrice +=
        (item.price - (item.price * item.discount) / 100) * item.quantity;
    }
    
    
  }

  getMyVoucher() {
    this.api
      .getMyVoucher(this.currPage - 1, 9, this.storage.getUser().id)
      .subscribe({
        next: (res) => {
          this.myVoucher = res.data.content;
          this.totalEle = res.data.totalElements;
        },
      });
  }
  removeVoucher(){
    this.selectedVoucher = null;
  }
  handleSelectedVoucher(voucher: Voucher) {
    this.selectedVoucher = voucher;
    this.openTableVoucher = !this.openTableVoucher;
    let priceDiscount = this.totalPrice * (voucher.percentDiscount / 100);
    if(priceDiscount < voucher.maxDiscount){
      this.totalPrice -= priceDiscount;
    }else{
      this.totalPrice -= voucher.maxDiscount;
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
        const billDetail = { productId:item.id,quantity:item.quantity}
        // itemCart =
        //   {'productId: ' : item.id +
        //   ',quantity: ' + item.quantity}
        dataCart.push(billDetail);
      }
      // for (const item of this.cartItem) {
      //   itemCart =
      //     'productId: ' +
      //     item.name +
      //     ',quantity: ' +
      //     item.quantity +
      //     ',price: ' +
      //     item.price +
      //     ',discount: ' +
      //     item.discount +
      //     '% ';
      //   dataCart.push(itemCart);
      // }

      this.formAdd.get('billDetails').setValue(dataCart);
      this.formAdd
        .get('createDate')
        .setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
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
        this.formAdd
          .get('createDate')
          .setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
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
          error: (err) => {},
        });
      }
    }
  }
}
