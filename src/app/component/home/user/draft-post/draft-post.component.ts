import { Component, OnInit } from '@angular/core';
import {SearchModelEntity} from '../../../admin/search-model-entiry';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Api} from '../../../../services/api';
import {ShareDataService} from "../../../../services/share-data.service";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-draft-post',
  templateUrl: './draft-post.component.html',
  styleUrls: ['./draft-post.component.scss']
})
export class DraftPostComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;

  dataDetailPost = [];
  dataSavePost = [];
  total: number;
  p = 1; // Trang hiện tại
  PostsId: any;
  savePostsUserId: any;
  myPostsUserId: any;
  data: any[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private shareDataService: ShareDataService,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      status: 2,
    });
    this.myPostsUserId = JSON.parse(localStorage.getItem('user')).id;
    this.handleSearch();
    this.savePostsUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      // const a = data.data.filter((item: any) => item.userId == this.myPostsUserId);
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    if (this.p != null) {
      this.searchModel.pageIndex = this.p;
    }
    this.searchModel.pageSize = 4;
    this.formSearch = this.fb.group({
      userId: this.myPostsUserId,
      status: 2,
    });
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  // PostsDetail(item: any) {
  //   this.PostsId = item.id;
  //   localStorage.setItem('postsId', item.id);
  //   localStorage.setItem('postsCategory', item.category);
  //   // setTimeout(() => {
  //   this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  // }
  handleEdit(item: any) {
    this.shareDataService.sendDataEditPosts(item);
    this.router.navigate(['/home/write']);
  }

  handleOkRefuse(value?: any) {
    value.status = -1;
    this.api.deletePosts(value).subscribe((res: any) => {
      this.notificationService.showMessage('success', 'Xóa bài viết thành công');
      this.handleSearch()
    })
  }

}
