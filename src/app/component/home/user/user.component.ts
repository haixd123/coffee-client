import {Component, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formSearch: FormGroup;
  searchModel: SearchModelEntity = new SearchModelEntity();
  data: any[];
  dataPosts: any[];
  dataLikePosts: any[];
  total: number;
  idUserLocalstorage: string;
  isFixInfo = true;
  idPostFromDataPosts = [];
  totalLike = 0;
  totalComment: number;
  totalPosts: number;

  postIdToCountLike: any[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: Api,

  ) {
    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
    this.handleSearch();
    this.formSearch = this.fb.group({
      userId: null,
      postId: null,
    });
  }

  ngOnInit(): void {
  }

  async handleUpdate(searchModel: SearchModelEntity, reset = false) {
    await this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });

    await this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
      this.dataPosts = data.data;
      this.total = data.optional;
    });


    this.formSearch = this.fb.group({
      userId: this.idUserLocalstorage,
    });
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    await this.api.getTotalLikePost(this.searchModel).toPromise().then((data: any) => {
      this.totalLike = data.optional;

    });

    await this.api.getTotalCommentPost(this.searchModel).toPromise().then((data: any) => {
      this.totalComment = data.optional;
    });

    await this.api.getListTotalPosts(this.searchModel).toPromise().then((data: any) => {
      this.totalPosts = data.optional;
      console.log('this.totalComment: ', data);
    });


  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 100;
    this.handleUpdate(this.searchModel, true);
  }

  handleChangeAvatar() {

  }

  handleupdateInfo() {
    this.isFixInfo = false;
  }

}
