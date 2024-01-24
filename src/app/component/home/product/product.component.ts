import {Component, OnChanges, OnInit} from '@angular/core';
import {Api} from '../../../services/api';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {ReducerService} from '../../../services/reducer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  voucherOptions: any ={
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    margin: 15,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      540: {
        items: 3
      },
      720: {
        items: 4
      },
      
    },
  }
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    margin: 15,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      540: {
        items: 3
      },
      720: {
        items: 4
      },
      960: {
        items: 5
      },
      
    },
  };

  searchModel: SearchModelEntity = new SearchModelEntity();
  formUpdateQuantity: FormGroup;

  data: any[] = [];
  datProduct50k: any[] =[];
  dataTop5: any[] = [];
  isOpenDrawer = false;
  demoValue = 1;
  dataCart = [];
  dataCartLocalStorage = [];
  totalMoneyCart: number;
  found = false;
  isVisible = false;
  detailProduct: any;
  ListProductSame: any[] = []
  category: any;
  inputQuantity: any;
  voucher: any[];

  // rawData = {
  //   image:"https://bizweb.dktcdn.net/thumb/large/100/465/740/products/ctw-t1.jpg?v=1705255416470",
  //   name:"[Mua 2 tặng 2: Tặng túi cói Thời Trang Highlands+01 gói cà phê 200g] Combo 2 Túi Cà Phê Truyền Thống Highlands Coffee 1kg",
  //   price: 758_000,
  //   discount: 20,
  // }

  constructor(
    private api: Api,
    private fb: FormBuilder,
    private reducerService: ReducerService,
    private router: Router,
  ) {
    // this.data = Array(10).fill(this.rawData);
    // this.dataTop5= Array(10).fill(this.rawData);
    // this.datProduct50k= Array(10).fill(this.rawData);
    // this.voucher = Array(5).fill(1);

    this.api.getListProduct(this.searchModel).subscribe((data: any) => {
      this.data = data.data;
      for (const item1 of this.data) {
        const a = (item1?.price - item1?.price * item1?.discount / 100)
        console.log('a: ', a)
        console.log('typeof a: ', typeof a)
        if (a <= 50000) {
          this.datProduct50k.push(item1)
        }
      }

      this.dataTop5 = data.data.sort((a, b) => {
        return a.price - b.price
      })
      this.dataTop5.slice(0, 5)
      console.log('this.dataTop5: ', this.dataTop5)
    });

    this.formUpdateQuantity = this.fb.group({
      quantity: null,
    });
    this.formUpdateQuantity.patchValue({
      quantity: JSON.parse(localStorage.getItem('cartItems'))?.quantity,
    });
  }

  ngOnChanges() {
    console.log('changes')
  }

  ngOnInit(): void {
    console.log('changes')
  }

  addItemCart(value: any) {
    this.detailProduct = value;
    this.isVisible = false;

    this.found = false;
    const isCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (this.dataCart.length === 0 && isCartItems) {
      this.dataCart = JSON.parse(localStorage.getItem('cartItems'));
    }

    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name) {
        this.found = true;
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });

    if (!this.found) {
      value.quantity = 1;
      this.dataCart.push(value);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    // this.dataCart = JSON.parse(localStorage.getItem('cartItems'));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);
    this.isOpenDrawer = true;

  }

  minusItemCart(value: any) {
    const newList = this.dataCart.filter((item: any) => {
      return item.id !== value.id;
    });
    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    if (value.quantity == 1) {
      this.dataCart = newList;
    }

    if (this.dataCart.length == 0) {
      this.isOpenDrawer = false;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);

  }

  changeInputQuantity(value: any, inputQuantity: any) {
    console.log('inputQuantity1: ', this.inputQuantity)
    console.log('inputQuantity2: ', inputQuantity)
    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name) {
        return {
          ...item,
          quantity: this.inputQuantity
        };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);
  }

  plusItemCart(value: any) {
    this.dataCart = this.dataCart.map((item: any) => {
      if (value.name === item.name) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);

  }

  removeItemCart(value: any) {
    const newList = this.dataCart.filter((item: any) => {
      return item.id !== value.id;
    });
    this.dataCart = newList;
    if (this.dataCart.length == 0) {
      this.isOpenDrawer = false;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.dataCart));
    this.totalMoneyCart = this.reducerService.reduceArray(this.dataCart, this.demoValue);

  }

  open(): void {
    this.isOpenDrawer = false;
    this.router.navigate(['/home/checkout']);
  }

  close(): void {
    this.isOpenDrawer = false;
  }

  showModal(value: any): void {
    this.detailProduct = value;
    this.isVisible = true;
    this.category = value.category;
    this.ListProductSame = []
    for (const item of this.data) {
      if (this.category == item.category && item.id != this.detailProduct.id) {
        this.ListProductSame.push(item)
      }
    }
    console.log('this.ListProductSame: ', this.ListProductSame)
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleDetailProduct(value: any) {
    this.detailProduct = value;
    this.ListProductSame = []
    for (const item of this.data) {
      if (this.detailProduct.category == item.category && item.id != this.detailProduct.id) {
        this.ListProductSame.push(item)
      }
    }
  }

}
