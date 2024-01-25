import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../../../../admin/search-model-entiry';
import {Api} from '../../../../../services/api';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ckeditor-detail',
  templateUrl: './ckeditor-detail.component.html',
  styleUrls: ['./ckeditor-detail.component.scss']
})
export class CkeditorDetailComponent implements OnInit, OnChanges {
  @Input() cofeeBeanId: any;
  // myCode: any;
  formSearch: FormGroup;
  searchModel: SearchModelEntity = new SearchModelEntity();
  test1: any;

  dataCoffeeBean: any[];

  slugCoffeeBeanDetail: any;
  testData: any;

  constructor(
    private http: HttpClient,
    private api: Api,
    private activatedRoute: ActivatedRoute,
  ) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 30;
    this.api.getListCoffee(this.searchModel).toPromise().then((data: any) => {
      this.dataCoffeeBean = data.data;
    });
    this.slugCoffeeBeanDetail = localStorage.getItem('cofeeBeanId');


    // this.slugPostsDetail = localStorage.getItem('slugPosts');
  }

  dataCkeditorCoffeeBean: any;
  dataCkeditorEquipment: any;
  dataCkeditorPosts: any;
  dataCkeditor: any;

  // myCode = '<div><div {{*ngFor="let item of dataCoffeeBean"}} >{{item.contentCoffee}}</div></div>';
  ngOnChanges() {
    // this.slugCoffeeBeanDetail = this.cofeeBeanId;
    this.test1 = 1;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log('params: ', params);
      this.testData = params.get('id');
      console.log('this.testData: ', params)
      // localStorage.setItem('postsCategory', params.get('category'));
      // localStorage.setItem('postsId', params.get('id'));
      // this.shareDataService.sendDataCategory(params.get('category'));
      // this.shareDataService.sendDataIdPost(params.get('id'));


    });
  }

  // myCode1() {
  //   let myCode;
  //   for (const item12 of this.dataCoffeeBean) {
  //     console.log('item12: ', item12.contentCoffee);
  //     myCode = '<div><div>{{item12.contentCoffee}}</div></div>';
  //   }
  // }

}

