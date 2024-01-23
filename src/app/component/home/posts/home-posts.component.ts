import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {ShareDataService} from '../../../services/share-data.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';
import {NotificationService} from '../../../services/notification.service';
import {NzPlacementType} from 'ng-zorro-antd';

@Component({
  selector: 'app-posts',
  templateUrl: './home-posts.component.html',
  styleUrls: ['./home-posts.component.scss']
})
export class HomePostsComponent implements OnInit, OnChanges {

  searchModel: SearchModelEntity = new SearchModelEntity();
  total: number;
  formSearch: FormGroup;
  formSearchInput: FormGroup;
  PostsId: any;
  data: any[];
  curPage: number;
  isEditPosts = false;
  idPosts: number;

  listFromUser: any;
  listIsCommentPost: any;
  listIsReplyComment: any;

  searchCoffee: string;
  idPostsLocalstorage: string;


  category: string;
  subscription: Subscription;

  PostIdLocalStorage: string;
  userLocalstorage: any;

  dataTopCommentPost: any[];
  dataTopLikePost: any[];
  postOfUser: any;

  listOfPosition: NzPlacementType[] = ['bottomLeft'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private api: Api,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      category: null,
      status: 1,
    });
    this.formSearchInput = this.fb.group({
      inputSearch: null
    });
    this.subscription = this.shareDataService.dataCategory$.subscribe((data) => {
      this.category = data;
      if (this.category) {
        this.search(this.category);
      }
      if (!this.category) {
        this.search(null);
      }
    });
    this.PostIdLocalStorage = localStorage.getItem('postsId');
    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
    this.idPostsLocalstorage = localStorage.getItem('postsId');

    //???
    this.activatedRoute.paramMap.subscribe(params => {
      this.category = params.get('category');
      if (this.category) {
        this.search(this.category);
      }
      if (!this.category) {
        this.search(null);
      }
    });

    this.http.get('http://localhost:8080/api/authors/posts/comment-post').toPromise().then((data: any) => {
      this.dataTopCommentPost = data.data;
      // console.log('res comment: ', data);
    });

    this.http.get('http://localhost:8080/api/authors/posts/like-post').toPromise().then((data: any) => {
      // console.log('res like: ', data);
      this.dataTopLikePost = data.data;
    });

//???
//     this.http.get('http://localhost:8080/api/authors/notify/search-list-from-user').subscribe(res => {
//       console.log('search-list-from-user: ', res);
//       this.listFromUser = res;
//     });
//
//     this.http.get('http://localhost:8080/api/authors/notify/search-list-isComment-post').subscribe(res => {
//       console.log('search-list-isComment-post: ', res);
//       this.listFromUser = res;
//     });
//
//     this.http.get('http://localhost:8080/api/authors/notify/search-list-isReply-comment').subscribe(res => {
//       console.log('search-list-isReply-comment: ', res);
//       this.listFromUser = res;
//     });

    // listFromUser: any;
    // listIsCommentPost: any;
    // listIsReplyComment: any;
  }

  update(searchModel: SearchModelEntity, reset = false) {
    this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
      for (const item of data.data) {
        if (this.idPostsLocalstorage == item.id) {
          this.postOfUser = item.userId;
        }
      }
    });
  }

  search(value?) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.formSearch.get('category').setValue(value);
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.update(this.searchModel, true);
  }

  PostsDetail(item: any) {
    this.PostsId = item.id;
    localStorage.setItem('postsId', item.id);
    localStorage.setItem('postsCategory', item.category);
    this.shareDataService.sendDataCategory(item.category);
    // setTimeout(() => {
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.update(this.searchModel, false);
  }

  handleMoreBtn(item?: any) {
    this.idPosts = item.id;
    // this.isEditPosts = false;
    this.isEditPosts = !this.isEditPosts;
  }

  editPosts(item: any) {
    this.shareDataService.sendDataEditPosts(item);
    this.router.navigate(['/home/write']);
  }

  deletePosts(item: any) {
    this.api.deletePosts(item).subscribe((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa đăng thành công');
        this.changePage();
      } else {
        this.notificationService.showMessage('error', 'Xóa đăng thất bại');
      }
    });
  }

  changeToDetailPosts(item) {
    localStorage.setItem('postsId', item.id);
    this.idPostsLocalstorage = item.id;
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }
}
