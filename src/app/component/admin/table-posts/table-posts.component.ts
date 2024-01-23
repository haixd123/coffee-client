import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {SearchModelEntity} from '../search-model-entiry';
import {NotificationService} from '../../../services/notification.service';
import {NzTableFilterFn, NzTableFilterList, NzTableQueryParams, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd';
import {Api} from '../../../services/api';

interface DataItem {
  STT: number;
  Id: number;
  like1: number;
  share: number;
  comment: number;
  title: string;
  contentPost: string;
  contentDetail: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  Action: any;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.scss']
})

export class TablePostsComponent implements OnInit {

  // listOfColumns: ColumnItem[] = [
  //   {name: 'STT'},
  //   {name: 'Id'},
  //   {
  //     name: 'Like',
  //     sortFn: (a: DataItem, b: DataItem) => a.like1 - b.like1
  //       // => {
  //       // for (const item of this.data) {
  //       //   item.share - item.like;
  //       // }}
  //   },
  //   {name: 'Share'},
  //   {name: 'Comment'},
  //   {name: 'title'},
  //   {name: 'Content Post'},
  //   {name: 'Content Detail'},
  //   {name: 'imagePath'},
  //   {name: 'createdAt'},
  //   {name: 'updatedAt'},
  //   {name: 'Action'}];

  // listOfData: DataItem[] = [
  //   {
  //     STT: number;
  //     Id: number;
  //     Like: number;
  //     Share: number;
  //     Comment: number;
  //     title: string;
  //     contentPost: string;
  //     contentDetail: string;
  //     imagePath: string;
  //     createdAt: string;
  //     updatedAt: string;
  //     Action: any;
  //   }
  // ]


  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  data: any[];
  dataEdit: any;
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;
  testSort: any[];

  searchValue: string;
  sortValue: string;
  isSort = true;
  isSort1 = true;
  displayedData: any[] = [];

  isRefuse = false;
  inputValue = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
    private api: Api,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      title: null,
      sortLikeDown: null,
      sortLikeUp: null,
      sortCommentDown: null,
      sortCommentUp: null,
      status: null,
    });
    this.handleSearch();
    // this.changePage();

  }

  ngOnInit(): void {
  }


  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;
    this.formSearch.get('sortCommentDown').setValue(0);
    this.formSearch.get('sortCommentUp').setValue(0);
    this.formSearch.get('sortLikeDown').setValue(0);
    this.formSearch.get('sortLikeUp').setValue(0);
    // this.formSearch.get('title').setValue(this.formSearch.get('title').value);
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    if (this.formSearch.get('title').value == '') {
      this.formSearch.get('title').setValue(null);
    }
    // if (this.formSearch.get('category').value == '') {
    //   this.formSearch.get('category').setValue(null);
    // }
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, false);
    //
    // const startIndex = (this.curPage - 1) * 10;
    // const endIndex = startIndex + 10;
    // this.data = this.data.slice(startIndex, endIndex);
  }

  async handlechangePage(value: any) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;
    await this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
    const startIndex = (value - 1) * 10;
    const endIndex = startIndex + 10;
    this.data = this.data.slice(startIndex, endIndex);
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
    this.api.deletePosts(item).subscribe((data: any) => {
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

  handleRefuse(item: any) {
    this.isRefuse = true;
  }

  handleLikeSort(value: string) {
    if (this.isSort) {
      this.formSearch.get('sortLikeUp').setValue(1);
      this.formSearch.get('sortLikeDown').setValue(0);
      this.formSearch.get('sortCommentDown').setValue(0);
      this.formSearch.get('sortCommentUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      // this.api.getListPosts(this.formSearch.value).subscribe(res => {
        this.api.getListPosts(this.searchModel).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    if (!this.isSort) {
      this.formSearch.get('sortLikeDown').setValue(1);
      this.formSearch.get('sortLikeUp').setValue(0);
      this.formSearch.get('sortCommentDown').setValue(0);
      this.formSearch.get('sortCommentUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListPosts(this.searchModel).subscribe(res => {
        // this.api.getListPosts(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort = !this.isSort;
      return;
    }
    // this.sortValue = value;
    // this.isSort = !this.isSort;
  }

  handleCommentSort(value: string) {
    if (this.isSort1) {
      this.formSearch.get('sortCommentUp').setValue(1);
      this.formSearch.get('sortCommentDown').setValue(0);
      this.formSearch.get('sortLikeDown').setValue(0);
      this.formSearch.get('sortLikeUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      this.api.getListPosts(this.searchModel).subscribe(res => {
        // this.api.getListPosts(this.formSearch.value).subscribe(res => {
        this.data = res.data;
      });
      this.isSort1 = !this.isSort1;
      return;
    }
    if (!this.isSort1) {
      this.formSearch.get('sortCommentDown').setValue(1);
      this.formSearch.get('sortCommentUp').setValue(0);
      this.formSearch.get('sortLikeDown').setValue(0);
      this.formSearch.get('sortLikeUp').setValue(0);
      this.searchModel.pageIndex = 1;
      this.searchModel.pageSize = 10;

      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
      // this.api.getListPosts(this.formSearch.value).subscribe(res => {
        this.api.getListPosts(this.searchModel).subscribe(res => {

          this.data = res.data;
      });
      this.isSort1 = !this.isSort1;
      return;
    }
  }

  handleCheck(value: any) {
    const a = value;
    a.status = 1;
    // this.formSearch = value;
    // console.log('this.formSearch: ', this.formSearch);
    // this.formSearch.status = 1;
    // console.log('this.formSearch: ', this.formSearch);
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.api.updatePosts(a).subscribe((res: any) => {
      this.notificationService.showMessage('success', 'Duyệt bài viết thành công');
    }, error => this.notificationService.showMessage('error', 'Duyệt bài viết thất bại'));
  }

  handleOkRefuse() {
    this.isRefuse = false;
  }

  handleCancelRefuse() {
    this.isRefuse = false;
  }
}
