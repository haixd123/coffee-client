import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {FilterPipe} from '../../../shared/pipe/filter.pipe';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import { Voucher } from './interface/voucher';

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
    id: 1,
    name: "code 20%",
    description: "discount 20% for total bill greater 2M",
    code: "DC20P",
    percentDiscount: 20,
    voucherType: 1,
    expiredAt: "27/2/2024 00:00:00",
  }
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      name: null,
    });
    // this.handleSearch();
    // this.changePage();
    this.data = Array(10).fill(this.rawData);
  }

  ngOnInit(): void {
  }


  handleUpdate(searchModel: SearchModelEntity, reset = false) {
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
    this.handleUpdate(this.searchModel, true);
  }


  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, false);
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

  handleDelete(item: any) {
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
