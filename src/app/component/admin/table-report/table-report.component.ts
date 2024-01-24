import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchModelEntity } from '../search-model-entiry';
import { HttpClient } from '@angular/common/http';
import { ValidateService } from '../../../services/validate-service';
import { NotificationService } from '../../../services/notification.service';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { Report } from './interface/report';
import { Post } from './interface/post';
import { Comment } from './interface/comment';
import { User } from './interface/user';
import { Api } from 'src/app/services/api';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss'],
})
export class TableReportComponent implements OnInit {
  faSort = faSort;

  formSearch: FormGroup;
  // data: Report[] = [
  //   // bai viet
  //   {
  //     userReport: {
  //       id: 1,
  //       username: 'lang',
  //       passWord: 'string',
  //       email: 'lang@gmail.com',
  //       name: 'kieutrilang',
  //       role: 'user',
  //       phoneNumber: '09675645123',
  //       dateOfBirth: '1706009853830',
  //       sex: 'male',
  //       status: 1,
  //       image: 'https://th.bing.com/th/id/OIP.jTQ7stwnf36yR3-opM7mXAHaD5',
  //     },
  //     dataReportId: 1,
  //     reportType: 1,
  //     reason: 'toi muon bao cao bai viet nay',
  //     data: {
  //       id: 1,
  //       like1: 1,
  //       comment: 1,
  //       title: 'string',
  //       contentPost: 'string',
  //       contentDetail: 'string',
  //       status: 1,
  //       imagePath: 'https://th.bing.com/th/id/OIP.jTQ7stwnf36yR3-opM7mXAHaD5',
  //       userId: 1,
  //       createdAt: '1706009853830',
  //       updatedAt: '1706009853830',
  //       category: 'string',
  //       reason_deline: 'eroor',
  //     },
  //   },
  //   // comment
  //   {
  //     userReport: {
  //       id: 1,
  //       username: 'lang',
  //       passWord: 'string',
  //       email: 'lang@gmail.com',
  //       name: 'kieutrilang',
  //       role: 'user',
  //       phoneNumber: '09675645123',
  //       dateOfBirth: '1706009853830',
  //       sex: 'male',
  //       status: 1,
  //       image: 'https://th.bing.com/th/id/OIP.jTQ7stwnf36yR3-opM7mXAHaD5',
  //     },
  //     dataReportId: 1,
  //     reportType: 2,
  //     reason: 'toi muon bao cao binh luan nay',
  //     data: {
  //       id: 1,
  //       commentId: 1,
  //       userId: 1,
  //       postId: 1,
  //       commentText: 'This is a long comment. super long',
  //       createAt: '1706009853830',
  //       updateAt: '1706009853830',
  //       likeComment: 1,
  //       status: 1,
  //     },
  //   },
  // ];

  data: Report[];
  dataInfo: any;
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;
  datafilter: any[];

  searchValue: string;
  sortValue: string;
  isSort = false;

  filterAddress: any[];

  showInfo: string = '';
  newArray = [
    // {
    //   name: 'a',
    //   age: 15,
    // },
    // {
    //   name: 'b',
    //   age: 15,
    // },
    { text: 'Joe', value: 'Joe' },
    { text: 'John', value: 'John' },
    // 'a', 'b', 'c'
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
    private api: Api
  ) {
    this.formSearch = this.fb.group({
      reason: null,
    });
    this.handleSearch();
    this.changePage();
  }

  ngOnInit(): void {}

  handleUpdate() {
    let page = this.curPage -1;
    let size = 10;
    let reason = this.formSearch.get('reason').value;
    if ((reason + '').trim().length > 0) {
      this.api.getSearchReport(page, size, reason).subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      });
    } else {
      this.api.getAllReport(page, size).subscribe({
        next: (res) => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        },
      });
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
    // this.searchModel = Object.assign(
    //   {},
    //   this.searchModel,
    //   this.formSearch.value
    // );
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

  handleClosePopup(value: any) {
    this.showInfo = '';
    if (value) {
      this.changePage();
    }
  }

  handleRemovePostOrComment(reportType: any, id: number) {
    if (reportType == 1) {
      this.api.changeStatusPost(id, -1).subscribe({
        next: (res) => {
          res
            ? this.notificationService.showMessage(
                'success',
                'Ẩn bài viết thành công'
              )
            : null;
        },
      });
    } else {
      this.api.changeStatusComment(id, -1).subscribe({
        next: (res) => {
          res
            ? this.notificationService.showMessage(
                'success',
                'Ẩn bình luận thành công'
              )
            : null;
        },
      });
    }
  }

  handleDelete(id: number) {
    this.api.deleteReport(id).subscribe({
      next: (res) => {
        this.notificationService.showMessage(
          'success',
          'Xóa báo cáo thành công'
        );
        this.changePage();
      },
      error: (err) => {
        this.notificationService.showMessage('error', 'Xóa báo cáo thất bại');
      },
    });
  }

  handleSort(value: string) {
    this.sortValue = value;
    this.isSort = !this.isSort;
  }

  showPostOrComment(reportType: any, data: Post | Comment) {
    if (reportType == 1) {
      this.showInfo = 'post';
    } else {
      this.showInfo = 'comment';
    }
    this.dataInfo = data;
  }
  showUserInfo(data: User) {
    this.showInfo = 'user';
    this.dataInfo = data;
  }

  handleApproved(item: any) {}
  handleRefused() {}
}
