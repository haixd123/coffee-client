import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {FilterPipe} from '../../../shared/pipe/filter.pipe';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {
  faSort = faSort;

  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  data: any[];
  total: number;
  dataEdit: any;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;
  datafilter: any[];


  searchValue: string;
  sortValue: string;
  isSort = false;

  filterAddress: any[];

  newArray =
    [
      // {
      //   name: 'a',
      //   age: 15,
      // },
      // {
      //   name: 'b',
      //   age: 15,
      // },
      {text: 'Joe', value: 'Joe'},
      {text: 'John', value: 'John'}
      // 'a', 'b', 'c'
    ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      name: null,
    });
    this.handleSearch();
    // this.changePage();
  }

  ngOnInit(): void {
  }


  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
      // for (const item of data.data) {
      //   this.datafilter = item.address;
      //   console.log('this.datafilter : ', this.datafilter);
      // }


      // this.filterAddress = this.data.map((record) => {
      //   return {
      //     text: `${record.address}`,
      //     value: `${record.address}`
      //   };
      // });
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    // this.formSearch.get('userName').setValue(this.formSearch.get('name').value);
    // this.formSearch.get('address').setValue(this.formSearch.get('name').value);
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    if (this.formSearch.get('name').value == '') {
      this.formSearch.get('name').setValue(null);
    }
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
    this.http.post('http://localhost:8080/api/user/delete', item).toPromise().then((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa bài đăng thành công');
        this.isEdit = false;
      } else {
        this.notificationService.showMessage('error', 'Xóa bài đăng thất bại');
        this.isEdit = false;
      }
      this.changePage();
    });
  }

  handleSort(value: string) {
    this.sortValue = value;
    this.isSort = !this.isSort;
  }
}
