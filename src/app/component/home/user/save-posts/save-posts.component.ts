import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchModelEntity} from '../../../admin/search-model-entiry';
import {Api} from '../../../../services/api';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-save-posts',
  templateUrl: './save-posts.component.html',
  styleUrls: ['./save-posts.component.scss']
})
export class SavePostsComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;

  dataDetailPost = [];
  dataSavePost = [];
  total: number;
  p = 1; // Trang hiện tại
  PostsId: any;
  savePostsUserId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private shareDataService: ShareDataService
  ) {
    this.formSearch = this.fb.group({
      status: 1,
    });

    this.handleSearch();
    this.savePostsUserId = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
    this.shareDataService.setActivedNav('savePosts');
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    let a = [];
    this.api.getListSavePosts(this.searchModel).toPromise().then((data: any) => {
      console.log('data save-post: ', data.data)
      this.dataDetailPost = data.data;
      this.total = data.optional
      // for (const i of data.data) {
      //   if (i.userId == this.savePostsUserId) {
      //     this.dataSavePost.push(i.postId);
      //   }
      // }
      // console.log('data.data: ', data);
      // this.total = data.optional;
    });
    // this.searchModel.pageSize = 200;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
    //   a = [];
    //   this.dataDetailPost = [];
    //   for (const i of data.data) {
    //     for (const item of this.dataSavePost) {
    //       if (i.id == item) {
    //         a.push(i);
    //       }
    //     }
    //   }
    //   console.log('a: ', a);
    //   this.dataDetailPost = a;
    //   // this.dataDetailPost = data.data;
    //   // this.total = this.dataSavePost.length;
    // });

  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    if (this.p != null) {
      this.searchModel.pageIndex = this.p;
    }
    this.searchModel.pageSize = 4;
    this.formSearch = this.fb.group({
      status: 1,
    });
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  PostsDetail(item: any) {
    console.log('item to post detail: ', item)
    this.PostsId = item.postId;
    localStorage.setItem('postsId', item.postId);
    localStorage.setItem('postsCategory', item.category);

    // setTimeout(() => {
    this.router.navigate([`/home/detail/posts/${item.category}/${item.postId}`]);
  }

}
