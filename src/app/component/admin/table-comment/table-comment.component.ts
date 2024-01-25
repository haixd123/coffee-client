import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {FilterPipe} from '../../../shared/pipe/filter.pipe';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import {Comment} from '../table-report/interface/comment';
import {Api} from 'src/app/services/api';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table-comment',
  templateUrl: './table-comment.component.html',
  styleUrls: ['./table-comment.component.scss'],
})
export class TableCommentComponent implements OnInit {
  faSort = faSort;

  formSearch: FormGroup;
  data: any[];
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
  placeholderValue: string = 'bình luận';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
    private api: Api
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      typeSearch: '-1',
      value: '',
      status: '1',
      // title: null,
      // sortLikeDown: null,
      // sortLikeUp: null,
      // sortCommentDown: null,
      // sortCommentUp: null,
      // status: null,
    });
    this.handleSearch();
    this.changePage();
  }

  ngOnInit(): void {
  }

  handleUpdate() {
    let typeS = this.formSearch.get('typeSearch').value;
    let page = this.curPage - 1;
    let size = 10;
    if (typeS == '0') {
      let status = Number(this.formSearch.get('status').value);
      let userId = this.formSearch.get('value').value;
      if (userId != null && (userId + '').trim().length > 0) {
        this.api.getAllCommentByUserId(page, size, userId, status).subscribe({
          next: (res) => {
            this.data = res.data.content;
            this.total = res.data.totalElements;
          },
        });
      } else {
        this.getDataCommentByCommentContaining(page, size);
      }
    }
    if (typeS == '1') {
      let status = Number(this.formSearch.get('status').value);
      let postId = this.formSearch.get('value').value;
      if (postId != null && (postId + '').trim().length > 0) {
        this.api.getAllCommentByPostId(page, size, postId, status).subscribe({
          next: (res) => {
            this.data = res.data.content;
            this.total = res.data.totalElements;
          },
        });
      } else {
        this.getDataCommentByCommentContaining(page, size);
      }
    }
    if (typeS == '3') {
      let status = this.formSearch.get('status').value;
      this.api.getAllCommentByStatus(page, size, status).subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      });
    }
    if (typeS == '2' || typeS == '-1') {
      this.getDataCommentByCommentContaining(page, size);
    }
    if (typeS == '-1') {
      this.formSearch.patchValue({
        pageIndex: this.curPage,
        pageSize: 10,
        status: null,
        typeSearch: '-1',
        value: '',
      });
      this.api.getListComment(this.formSearch.value).subscribe((res: any) => {
        this.data = res.data;
        this.total = res.optional;
      })
    }
  }

  getDataCommentByCommentContaining(page: number, size: number) {
    let infix = this.formSearch.get('value').value;
    this.api.getAllCommentByCommentContaining(page, size, infix).subscribe({
      next: (res) => {
        this.data = res.data.content;
        this.total = res.data.totalElements;
      },
    });
  }


  resetDefaultValueOfForm() {
    this.formSearch.get('value').setValue('');
  }

  log(value: string) {

    if (value == '-1') {
      this.placeholderValue = 'id của người dùng';
      this.resetDefaultValueOfForm();
    }
    if (value == '0') {
      this.placeholderValue = 'id của người dùng';
    }
    if (value == '1') {
      this.placeholderValue = 'id của bài viết';
    }
    if (value == '3') {
      this.placeholderValue = 'trạng thái';
    }
    if (value == '2') {
      this.placeholderValue = 'bình luận';
    }
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;
    // this.formSearch.get('sortCommentDown').setValue(0);
    // this.formSearch.get('sortCommentUp').setValue(0);
    // this.formSearch.get('sortLikeDown').setValue(0);
    // this.formSearch.get('sortLikeUp').setValue(0);
    // // this.formSearch.get('title').setValue(this.formSearch.get('title').value);
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // if (this.formSearch.get('title').value == '') {
    //   this.formSearch.get('title').setValue(null);
    // }
    // if (this.formSearch.get('category').value == '') {
    //   this.formSearch.get('category').setValue(null);
    // }
    this.handleUpdate();
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate();
    //
    // const startIndex = (this.curPage - 1) * 10;
    // const endIndex = startIndex + 10;
    // this.data = this.data.slice(startIndex, endIndex);
  }

  // async handlechangePage(value: any) {
  //   this.searchModel.pageIndex = 1;
  //   this.searchModel.pageSize = 100;
  //   await this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
  //     this.data = data.data;
  //     this.total = data.optional;
  //   });
  //   const startIndex = (value - 1) * 10;
  //   const endIndex = startIndex + 10;
  //   this.data = this.data.slice(startIndex, endIndex);
  // }

  handleAdd() {
    // this.isAdd = true;
  }

  handleEdit(item: any) {
    // this.isEdit = true;
    // this.dataEdit = item;
  }

  handleClosePopup(value: any) {
    // this.isAdd = false;
    // this.isEdit = false;
    if (value) {
      this.changePage();
    }
  }

  handleDelete(item: any) {
    this.api.deleteComment(item).subscribe((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa bình luận thành công');
      } else {
        this.notificationService.showMessage('error', 'Xóa bình luận thất bại');
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
      this.searchModel = Object.assign(
        {},
        this.searchModel,
        this.formSearch.value
      );
      // this.api.getListPosts(this.formSearch.value).subscribe(res => {
      this.api.getListPosts(this.searchModel).subscribe((res) => {
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
      this.searchModel = Object.assign(
        {},
        this.searchModel,
        this.formSearch.value
      );
      this.api.getListPosts(this.searchModel).subscribe((res) => {
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
      this.searchModel = Object.assign(
        {},
        this.searchModel,
        this.formSearch.value
      );
      this.api.getListPosts(this.searchModel).subscribe((res) => {
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

      this.searchModel = Object.assign(
        {},
        this.searchModel,
        this.formSearch.value
      );
      // this.api.getListPosts(this.formSearch.value).subscribe(res => {
      this.api.getListPosts(this.searchModel).subscribe((res) => {
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
    this.api.updatePosts(a).subscribe(
      (res: any) => {
        this.notificationService.showMessage(
          'success',
          'Duyệt bài viết thành công'
        );
      },
      (error) =>
        this.notificationService.showMessage('error', 'Duyệt bài viết thất bại')
    );
  }

  handleOkRefuse() {
    this.isRefuse = false;
  }

  handleCancelRefuse() {
    this.isRefuse = false;
  }

  handleReupComment(item) {
    item.status = 1
    this.api.updateComment(item).subscribe((res: any) => {
      this.notificationService.showMessage(
        'success',
        'Duyệt bài viết thành công'
      );
      console.log('res comment: ', res)
    }, (error) =>
      this.notificationService.showMessage('error', 'Duyệt bài viết thất bại'))
  }
}
