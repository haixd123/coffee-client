import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import { Voucher } from './interface/voucher';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-table-voucher',
  templateUrl: './table-voucher.component.html',
  styleUrls: ['./table-voucher.component.scss']
})
export class TableVoucherComponent implements OnInit {
  faSort = faSort;

  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  data: Voucher[];
  total: number;
  dataEdit: Voucher;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;
  
  isSort = false;

  rawData = {
    id: "SDFEKI",
    description: "discount 20% for total bill greater 2M",
    percentDiscount: 20,
    voucherType: 1,
    maxDiscount: 200_000,
    createdAt: "2024/02/27 00:00:00",
    expiredAt: "2024/02/27 00:00:00",
  }
  
  constructor(
    private fb: FormBuilder,
    private api: Api,
    public validateService: ValidateService,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      typeSort: '0',
    });
    this.handleSearch();
    this.changePage();
    // this.data = Array(10).fill(this.rawData);
  }

  ngOnInit(): void {
  }

  
  handleUpdate() {
    let typeSort = this.formSearch.get('typeSort').value;
    let page = this.curPage - 1;
    let size = 10;
    if(typeSort == "-1"){
      this.api.getAllVoucher(page,size).subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      })
    }
    if(typeSort == "0"){
      this.api.getAllAndSortVoucher(page,size,"created_at").subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      })
    }
    if(typeSort == "1"){
      this.api.getAllAndSortVoucher(page,size,"discount").subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      })
    }
    
    // this.http.post('http://localhost:8080/api/authors/user/search', this.searchModel).toPromise().then((data: any) => {
    //   this.data = data.data;
    //   this.total = data.optional;
    //   // for (const item of data.data) {
    //   //   this.datafilter = item.address;
    //   //   console.log('this.datafilter : ', this.datafilter);
    //   // }


    //   // this.filterAddress = this.data.map((record) => {
    //   //   return {
    //   //     text: `${record.address}`,
    //   //     value: `${record.address}`
    //   //   };
    //   // });
    // });
  }


  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    // this.formSearch.get('userName').setValue(this.formSearch.get('name').value);
    // this.formSearch.get('address').setValue(this.formSearch.get('name').value);
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // if (this.formSearch.get('name').value == '') {
    //   this.formSearch.get('name').setValue(null);
    // }
    this.handleUpdate();
  }


  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate();
  }

  handleAdd() {
    this.isAdd = true;
  }

  handleEdit(item: any) {
    this.isEdit = true;
    this.dataEdit = item;
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      this.changePage();
    }
  }

  handleDelete(item: Voucher) {
    this.api.deleteVoucher(item.id).subscribe({
      next: res =>{
        this.notificationService.showMessage('success', 'Xóa bài voucher thành công');
        this.isEdit = false;
        this.changePage();
      },
      error: error =>{
        this.notificationService.showMessage('error', 'Xóa voucher thất bại');
        this.isEdit = false;
      }
    })
    // this.http.post('http://localhost:8080/api/user/delete', item).toPromise().then((data: any) => {
    //   if (data.errorCode == '00') {
    //     this.notificationService.showMessage('success', 'Xóa bài đăng thành công');
    //     this.isEdit = false;
    //   } else {
    //     this.notificationService.showMessage('error', 'Xóa bài đăng thất bại');
    //     this.isEdit = false;
    //   }
    //   this.changePage();
    // });
  }

  // handleSort(value: string) {
  //   this.sortValue = value;
  //   this.isSort = !this.isSort;
  // }
}
