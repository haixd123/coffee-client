import { Component, OnInit } from '@angular/core';
import { SearchModelEntity } from '../../../admin/search-model-entiry';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../../../../services/api';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();

  formSearch: FormGroup;

  data: any[];
  total: number = 4;
  p: number = 1; // Trang hiện tại
  PostsId: any;
  myPostsUserId: any;

  rawData = {
    imagePath: 'https://th.bing.com/th/id/OIP.PcX5mOVMNF6P3LafvjBAUQHaE7',
    title: 'This is a title of post',
    createdAt: '1706161763170',
    category: 'Category',
    contentPost: 'This is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of postThis is a long content of post',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private api: Api
  ) {
    // this.formSearch = this.fb.group({
    //   status: 1,
    // });
    this.myPostsUserId = JSON.parse(localStorage.getItem('user')).id;
    // this.handleSearch();
    // this.data = Array(4).fill(this.rawData);
    this.handleSearch()
  }

  ngOnInit(): void {}

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api
      .getListPosts(this.searchModel)
      .toPromise()
      .then((data: any) => {
        // const a = data.data.filter((item: any) => item.userId == this.myPostsUserId);
        this.data = data.data;
        this.total = data.optional;
        console.log('this.data2: ', data);
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
      status: 1,
    });
    this.searchModel = Object.assign(
      {},
      this.searchModel,
      this.formSearch.value
    );
    this.handleUpdate(this.searchModel, true);
  }

  PostsDetail(item: any) {
    this.PostsId = item.id;
    localStorage.setItem('postsId', item.id);
    localStorage.setItem('postsCategory', item.category);
    // localStorage.setItem('hashTag', item.hashTag);
    // setTimeout(() => {
    this.router.navigate([`/home/detail/posts/${item.category}/${item.id}`]);
  }
}
