import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchModelEntity} from '../admin/search-model-entiry';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ShareDataService} from '../../services/share-data.service';
import {log} from 'ng-zorro-antd';
import {newArray} from '@angular/compiler/src/util';
import {Api} from '../../services/api';
import {WebsocketService} from '../../services/Websocket.service';
import {NotificationService} from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;
  formSearchNotify: FormGroup;
  formDetailPost: FormGroup;

  isReset: boolean;


  isCoffee = 0;

  searchCoffee: any;

  userLocalstorage: any;

  dataCategory: any[];
  dataPost = [];
  dataNotify: any[];
  dataNotify2 = [];
  total: number;

  inputChatAsk: string;
  dataChat = [];
  autoFocus: boolean;
  isDisabledInputChat: boolean;
  isWaitingReply: boolean;
  isOpenChatBot = false;

  dataFromUser: any[] = [];
  dataCommentPost: any;
  dataReplyComment: any;

  dataReceiveNotifyFromPost: any[] = [];
  dataReceiveNotifyFromReplyComment: any[] = [];
  userReceiveNotifyFromReplyComment: any[] = [];
  notificationReceiver: any[] = [];
  totalNotify: any[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private api: Api,
    private notificationService: NotificationService,
    private websocketService: WebsocketService,
  ) {
    this.formSearch = this.fb.group({
      name: null
    }, {});

    this.formSearchNotify = this.fb.group({
      toUser: null,
    });
    this.handleUpdate();
    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
    this.websocketService.receiveComment().subscribe((comment: any) => {
      this.handleUpdate();
    });
    this.websocketService.receiveNotification().subscribe((notification: any) => {
      notificationService.showMessage('success', 'Bạn vừa có một thông báo mới');
      this.handleUpdate();
    });
  }

  ngOnInit(): void {
    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
    this.http.get('http://localhost:8080/api/authors/posts/search-list-category').toPromise().then((data: any) => {
      this.dataCategory = data.data;
      this.total = data.optional;
    });
    this.http.get('http://localhost:8080/api/authors/notifications/' + this.userLocalstorage?.id).subscribe((res: any) => {
      console.log('res-noty: ', res);
      this.notificationReceiver = res;
    });
    // console.log('this.userReceiveNotifyFromReplyComment: ', this.userReceiveNotifyFromReplyComment);
    //
    // this.totalNotify = [...this.dataReceiveNotifyFromPost, ...this.userReceiveNotifyFromReplyComment];
    // console.log('this.totalNotify: ', this.totalNotify);
  }

  sendData(value?: any) {
    this.shareDataService.sendDataSearch(value ? value : this.searchCoffee);
  }


  async handleUpdate(searchModel?: SearchModelEntity) {
    // this.http.get('http://localhost:8080/api/authors/notify/search-list-from-user').subscribe((res: any) => {
    //   // this.dataFromUser = res.data;
    //   this.dataFromUser = res.data.filter((item: any) => item.userid != this.userLocalstorage.id);
    //   // for (const item of res.data) {
    //   //   if (item.userid != this.userLocalstorage.id) {
    //   //     this.dataFromUser.push(item);
    //   //   }
    //   // }
    // });
    this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
    this.http.get('http://localhost:8080/api/authors/notifications/' + this.userLocalstorage?.id).subscribe((res: any) => {
      this.notificationReceiver = res;
    });
    // this.http.get('http://localhost:8080/api/authors/notify/search-list-isComment-post').subscribe((res: any) => {
    //   this.dataCommentPost = res.data;
    //   console.log('this.dataCommentPost: ', this.dataCommentPost);
    //   for (const item of this.dataCommentPost) {
    //     if (item.commentId == null) {
    //       if (item.userName == this.userLocalstorage.userName) {
    //         this.dataReceiveNotifyFromPost.push(item);
    //       }
    //     }
    //     if (item.commentId != null) {
    //       this.dataReceiveNotifyFromReplyComment.push(item);
    //     }
    //   }
    // });
    // this.http.get('http://localhost:8080/api/authors/notify/search-list-isReply-comment').subscribe((res: any) => {
    //   this.dataReplyComment = res.data;
    //   for (const item of this.dataReplyComment) {
    //     for (const item1 of this.dataReceiveNotifyFromReplyComment) {
    //       if (item.commentId == item1.commentId) {
    //         if (item1.userName == this.userLocalstorage.userName) {
    //           this.dataReceiveNotifyFromPost.push(item1);
    //         }
    //       }
    //     }
    //   }
    // });


    // this.formSearchNotify.get('toUser').setValue(JSON.parse(localStorage.getItem('user')).id);
    // await this.api.getListNotify(this.formSearchNotify.value).toPromise().then((data: any) => {
    //   this.dataNotify = data.data;
    //   console.log('this.dataNotify: ', this.dataNotify);
    // });

    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 150;
    // await this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
    // for (const item of data.data) {
    //   for (const item2 of this.dataNotify) {
    //     if (item.id == item2.postId) {
    //       this.dataPost.push(item);
    //       this.dataNotify2.push(item2);
    //     }
    //   }
    // }
    // });

  }

  handleSearch() {
    // this.searchModel.pageIndex = 1;
    // this.searchModel.pageSize = 100;
    // // this.formSearch.get('name').setValue(this.formSearch.get('nameSearch').value);
    // // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    // this.handleUpdate(this.searchModel, true);
  }


  logOut() {
    this.isCoffee = 4;
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  linkToAdmin() {
    this.router.navigate(['/admin']);
  }


  linkToCoffee() {
    this.isCoffee = 1;
    this.router.navigate(['/home/coffee-bean']);
    this.shareDataService.sendDataSearch('');
  }

  linkToEquipment() {
    this.isCoffee = 2;
    this.router.navigate(['/home/equipment']);
  }

  linkToPost() {
    this.isCoffee = 3;
    this.shareDataService.sendDataCategory('');
    this.router.navigate(['/home/posts']);
  }

  linkToProduct() {
    this.router.navigate(['/home/product']);
  }

  linkToContact() {
    this.isCoffee = 4;
  }

  noBody() {
    this.isCoffee = 5;
    this.shareDataService.setActivedNav("info");
  }

  changeNav(tabName: string){
    this.shareDataService.setActivedNav(tabName);
  }


  category(value) {
    this.shareDataService.sendDataCategory(value);
    this.router.navigate(['/home/posts/', value]);
  }


  handleSubmitChat() {
    this.dataChat.push({user: this.inputChatAsk});
    this.autoFocus = true;
    this.isDisabledInputChat = true;
    this.isWaitingReply = true;
    this.http.get(`http://localhost:8080/api/authors/bot/chat?prompt=${this.inputChatAsk}`).toPromise().then(data => {
    }, error => {
      this.isDisabledInputChat = false;
      this.isWaitingReply = false;
      return this.dataChat.push({bot: error.error.text});
    });
    this.inputChatAsk = '';
  }

  linkToPostDetail(item: any) {
    console.log('item: ', item)
    if (item.content == 'Bài viết của bạn đã bị gỡ.' || item.content == 'Bài viết của bạn đã bị từ chối.') {
      this.formDetailPost = this.fb.group({
        id: item.postId,
      })
      this.api.getDetailPost(this.formDetailPost.value).subscribe((res: any) => {
        console.log('res detail post: ', res)
        this.shareDataService.sendDataEditPosts(res.data);
        this.router.navigate(['/home/write']);
      })

    }
    localStorage.setItem('postsCategory', item?.postCategory);
    this.shareDataService.sendDataCategory(item?.postCategory);
    this.router.navigate([`/home/detail/posts/${item?.postCategory}/${item.postId}`]);
  }

  openChatBot() {
    this.isOpenChatBot = !this.isOpenChatBot;
  }

  changeToCreatePost() {
    this.shareDataService.sendDataEditPosts(null);
    // this.shareDataService.sendDataEditPosts('1');
    this.router.navigate(['/home/write']);
  }
}
