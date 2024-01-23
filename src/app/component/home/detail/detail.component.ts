import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ShareDataService} from '../../../services/share-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';
import {WebsocketService} from '../../../services/Websocket.service';
import {NzPlacementType} from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() postDetailCategory: any;

  searchModel: SearchModelEntity = new SearchModelEntity();

  formSearch: FormGroup;

  dataTopLikePost: any[];
  dataTopCommentPost: any[];

  data: any[];
  total: number;

  category: string;
  subscription: Subscription;

  idPostsLocalstorage: string;
  dataIdPost: any;

  listOfPosition: NzPlacementType[] = ['bottomLeft'];


  // categoryPostsLocalstorage: string;

  constructor(
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: Api,
    private websocketService: WebsocketService,
    private fb: FormBuilder,
  ) {
    this.formSearch = this.fb.group({
      status: null,
    });

    this.handleSearch();
    this.subscription = this.shareDataService.dataCategory$.subscribe((data) => {
      this.category = data;
    });
    // this.websocketService.receiveComment().subscribe((comment: any) => {
    //   this.handleSearch();
    // });

    this.idPostsLocalstorage = localStorage.getItem('postsId');
    this.category = localStorage.getItem('postsCategory');

    this.subscription = this.shareDataService.dataIdPost$.subscribe(data => {
      this.dataIdPost = data;
      localStorage.setItem('postsId', this.dataIdPost);
      this.idPostsLocalstorage = this.dataIdPost;
    });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/authors/posts/like-post').toPromise().then((data: any) => {
      // console.log('res like: ', data);
      this.dataTopLikePost = data.data;
    });
    this.http.get('http://localhost:8080/api/authors/posts/comment-post').toPromise().then((data: any) => {
      this.dataTopCommentPost = data.data;
      // console.log('res comment: ', data);
    });
    // this.activatedRoute.url.subscribe(params => {
    //   console.log('params2: ', params);
    // });
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
    this.formSearch.get('status').setValue(1);
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  changeToDetailPosts(item) {
    localStorage.setItem('postsId', item.id);
    this.idPostsLocalstorage = item.id;
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }


}
