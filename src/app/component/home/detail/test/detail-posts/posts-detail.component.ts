import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../../../../admin/search-model-entiry';
import {ShareDataService} from '../../../../../services/share-data.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Api} from '../../../../../services/api';
import {WebsocketService} from '../../../../../services/Websocket.service';
import {DatePipe} from '@angular/common';
import {NotificationService} from '../../../../../services/notification.service';

@Component({
    selector: 'app-posts-detail',
    templateUrl: './posts-detail.component.html',
    styleUrls: ['./posts-detail.component.scss']
})
export class PostsDetailComponent implements OnInit {
    // @Input() PostsId: any;
    @ViewChild('textareaComment') textareaComment: ElementRef;
    @ViewChild('textareaReply') textareaReply: ElementRef;


    searchModel: SearchModelEntity = new SearchModelEntity();
    formAdd: FormGroup;
    formNotify: FormGroup;
    formReply: FormGroup;
    // formSearch: FormGroup;
    formLikeComment: FormGroup;
    formSearchPost: FormGroup;
    formRating: FormGroup;


    isReplyComment = false;
    isLike = false;
    isSave = false;
    postsId: number;

    category: string;

    dataUser: any[];
    dataPosts: any[];
    dataLikePosts: any[];
    dataSavePosts: any[];
    dataComment: any[];
    data: any[];
    dataInfoUserNotification: any;
    dataInfoCommentNotification: any;
    dataInfoPostNotification: any;

    idPostsLocalstorage: string;
    idUserLocalstorage: string;

    isEditPosts = false;
    idPosts: number;
    userLocalstorage: any;

    isEdit = false;

    dataEdit: any;
    imgPostDetail: string;
    categoryDetail: string;
    subscription: Subscription;
    idOfPostUser: any;

    isRefuse = false;
    inputValue = '';

    dataReportComment: any;
    abc: any[];
    inputRating: number;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private api: Api,
        private websocketService: WebsocketService,
        public datePipe: DatePipe,
        private notificationService: NotificationService,
        private shareDataService: ShareDataService,
    ) {
        this.formSearchPost = this.fb.group({
            status: 1,
        });

        this.formLikeComment = this.fb.group({
            id: null,
            commentId: null,
            userId: null,
            postId: null,
            commentText: null,
            createAt: null,
            updateAt: null,
            likeComment: null,
            status: null,
        });

        this.formAdd = this.fb.group({
            id: null,
            userId: null,
            replyCommentId: null,
            postId: null,
            isLikeNumber: null,
            contentCoffee: null,
            commentText: null,
            commentReplyText: null,
            name: null,
            commentId: null,
            createAt: null,
            updateAt: null,
            status: null,
        });

        this.formNotify = this.fb.group({
            id: null,
            userId: null,
            postId: null,
            commentId: null,
            createAt: null,
        });

        this.formReply = this.fb.group({
            name: null,
        });
        this.handleSearch();

        this.userLocalstorage = JSON.parse(localStorage.getItem('user'));
        this.idUserLocalstorage = JSON.parse(localStorage.getItem('user'))?.id;

        this.websocketService.receiveComment().subscribe((comment: any) => {
            this.api.getListComment(this.searchModel).toPromise().then((data: any) => {
                this.dataComment = data.data;
            });
        });
        this.api.getListComment(this.searchModel).toPromise().then((data: any) => {
            this.dataComment = data.data;
        });
    }


    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            // console.log('params: ', params);
            this.idPostsLocalstorage = params.get('id');
            localStorage.setItem('postsCategory', params.get('category'));
            localStorage.setItem('postsId', params.get('id'));
            this.shareDataService.sendDataCategory(params.get('category'));
            this.shareDataService.sendDataIdPost(params.get('id'));
        });

    }


    handleSearch() {
        this.searchModel.pageIndex = 1;
        this.searchModel.pageSize = 299;

        this.api.getListUser(this.searchModel).toPromise().then((data: any) => {
            this.dataUser = data.data;
        });

        this.formSearchPost.get('status').setValue(1);
        this.searchModel = Object.assign({}, this.searchModel, this.formSearchPost.value);
        this.api.getListPosts(this.searchModel).toPromise().then((data: any) => {
            this.dataPosts = data.data;
            for (const item of data.data) {
                if (this.idPostsLocalstorage == item.id) {
                    this.imgPostDetail = item.imagePath;
                    this.categoryDetail = item.category;
                    this.dataInfoPostNotification = item;
                    // gán id chủ bài viết
                    this.idOfPostUser = item.userId;
                }
            }
        });

        this.api.getListLikePosts(this.searchModel).toPromise().then((data: any) => {
            this.dataLikePosts = data.data;
            for (const item of data.data) {
                if (item.userId == this.idUserLocalstorage && item.postId == this.idPostsLocalstorage) {
                    this.isLike = true;
                }
            }
        });

        this.api.getListSavePosts(this.searchModel).toPromise().then((data: any) => {
            this.dataSavePosts = data.data;
            for (const item of data.data) {
                if (item.userId == this.idUserLocalstorage && item.postId == this.idPostsLocalstorage) {
                    this.isSave = true;
                }
            }
        });

        this.api.getListComment(this.searchModel).toPromise().then((data: any) => {
            this.dataComment = data.data;
        });

        // this.http.post('http://localhost:8080/api/like-comment/search', this.searchModel).toPromise().then((data: any) => {
        //   // this.dataComment = data.data;
        //   console.log('data.data: ', data.data);
        //   for (const item of data.data) {
        //     if (item.commentId && item.userId == this.idUserLocalstorage && item.postId == this.idPostsLocalstorage) {
        //       this.isLikeComment = true;
        //     }
        //   }
        // });
    }

    handleLike() {
        // this.isLike0 = true;
        this.formAdd = this.fb.group({
            userId: JSON.parse(localStorage.getItem('user')).id,
            postId: localStorage.getItem('postsId'),
            isLike: 1
        }, {});
        this.api.isLike(this.formAdd.value).subscribe(res => {
            this.isLike = true;
        });
    }

    handleUnLike() {
        // this.isLike0 = false;
        this.formAdd = this.fb.group({
            userId: JSON.parse(localStorage.getItem('user')).id,
            postId: localStorage.getItem('postsId'),
            isLike: 0
        });
        this.api.isLike(this.formAdd.value).subscribe(res => {
            this.isLike = false;
        });
    }

    handleSave() {
        // this.isLike0 = true;
        this.formAdd = this.fb.group({
            userId: JSON.parse(localStorage.getItem('user')).id,
            postId: localStorage.getItem('postsId'),
            isSave: 1
        }, {});
        this.api.isSave(this.formAdd.value).subscribe(res => {
            this.isSave = true;
        });
    }

    handleUnSave() {
        // this.isLike0 = false;
        this.formAdd = this.fb.group({
            userId: JSON.parse(localStorage.getItem('user')).id,
            postId: localStorage.getItem('postsId'),
            isSave: 0
        });
        this.api.isSave(this.formAdd.value).subscribe(res => {
            this.isSave = false;
        });
    }

    handleSubmitComment(item?: any) {
        if (this.dataInfoCommentNotification?.userId == JSON.parse(localStorage.getItem('user')).id) {
            this.notificationService.showMessage('error', 'Bạn không thể tự trả lời chính mình');
            return false;
        }
        const commentId = Math.floor(Math.random() * 10000000);
        if (this.dataEdit) {
            this.formAdd.get('id').setValue(this.dataEdit?.id);
            this.formAdd.get('replyCommentId').setValue(this.dataInfoCommentNotification?.id || null);
            this.formAdd.get('commentId').setValue(this.dataEdit?.commentId);
            this.formAdd.get('userId').setValue(this.dataEdit?.userId);
            this.formAdd.get('postId').setValue(this.dataEdit?.postId);
            this.formAdd.get('commentText').setValue(this.formAdd.get('commentReplyText').value ? this.formAdd.get('commentReplyText').value : this.formAdd.get('commentText').value);
            this.formAdd.get('status').setValue(1);
            this.formAdd.get('createAt').setValue(this.dataEdit?.createAt);
            this.formAdd.get('updateAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
            this.api.updateComment(this.formAdd.value).toPromise().then((res: any) => {
                if (res.errorCode == '00') {
                    this.notificationService.showMessage('success', 'Sửa bình luận thành công');
                } else {
                    this.notificationService.showMessage('error', 'Sửa bình luận thất bại');
                }
            });
        }

        if (!this.dataEdit) {
            this.formAdd.get('userId').setValue(null);
            this.formAdd.get('replyCommentId').setValue(this.dataInfoCommentNotification?.id || null);
            this.formAdd.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
            this.formAdd.get('postId').setValue(this.idPostsLocalstorage);
            this.formAdd.get('commentId').setValue(commentId);
            this.formAdd.get('commentText').setValue(this.formAdd.get('commentText').value ? this.formAdd.get('commentText').value : this.formAdd.get('commentReplyText').value);
            this.formAdd.get('createAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
            this.api.createComment(this.formAdd.value).toPromise().then((res: any) => {
                if (res.errorCode == '00') {
                    this.notificationService.showMessage('success', 'Đăng bình luận thành công');
                } else {
                    this.notificationService.showMessage('error', res.errorDescription);
                }
            });
        }

        //??? code cu
        // if (this.dataInfoCommentNotification) {
        //   // this.formNotify.get('userId').setValue(this.dataInfoCommentNotification.userId);
        //   this.formNotify.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
        //   // this.formNotify.get('userId').setValue(this.dataInfoCommentNotification.userId);
        //   this.formNotify.get('postId').setValue(this.dataInfoCommentNotification.postId);
        //   this.formNotify.get('commentId').setValue(commentId);
        //   this.formNotify.get('createAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
        //   this.api.createNotify(this.formNotify.value).toPromise().then((res: any) => {
        //   });
        // }
        // if (!this.dataInfoCommentNotification) {
        //   this.formNotify.get('userId').setValue(JSON.parse(localStorage.getItem('user')).id);
        //   this.formNotify.get('postId').setValue(localStorage.getItem('postsId'));
        //   this.formNotify.get('commentId').setValue(null);
        //   this.formNotify.get('createAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
        //   this.api.createNotify(this.formNotify.value).toPromise().then((res: any) => {
        //   });
        // }


        this.websocketService.sendComment('1', '2');
        this.isReplyComment = false;
        this.formAdd.reset();
        setTimeout(() => {
            this.handleSearch();
        }, 300);
    }


    handleReplyComment(itemComment?: any) {
        this.isReplyComment = !this.isReplyComment;
        this.dataInfoCommentNotification = itemComment;
        if (this.isReplyComment) {
            this.formAdd.reset();
            setTimeout(() => {
                this.focusTextAriaReplyComment();

            }, 10);
        }
    }


    focusTextAriaComment() {
        this.textareaComment.nativeElement.focus();
    }

    focusTextAriaReplyComment() {
        this.textareaReply.nativeElement.focus();
    }

    handleMoreBtn(item: any) {
        this.idPosts = item.id;
        this.isEditPosts = !this.isEditPosts;
    }

    editComment(item?: any) {
        this.isReplyComment = true;
        setTimeout(() => {
            this.textareaReply.nativeElement.focus();
        }, 100)
        this.formAdd.patchValue({
            commentReplyText: item.commentText
        });
        this.formAdd.get('id').setValue(item.id);
        this.formAdd.get('commentId').setValue(item.commentId);
        this.formAdd.get('userId').setValue(item.userId);
        this.formAdd.get('postId').setValue(item.postId);
        // tslint:disable-next-line:max-line-length
        this.formAdd.get('commentReplyText').setValue(this.formAdd.get('commentText').value ? this.formAdd.get('commentText').value : this.formAdd.get('commentReplyText').value);
        // this.formAdd.get('createAt').setValue(this.datePipe.transform(item.createAt, 'dd/MM/yyyy'));
        this.searchModel = Object.assign({}, this.searchModel, this.formAdd.value);
        this.dataEdit = item;

    }

    deleteComment(item: any) {
        this.api.deleteComment(item).subscribe((res: any) => {
            if (res.errorCode == '00') {
                this.notificationService.showMessage('success', 'Xóa luận thành công');
            } else {
                this.notificationService.showMessage('error', 'Xóa luận thất bại');
            }
        });

        //??? code cu
        // this.api.deleteNotify(item).toPromise().then(res => {
        // });
        this.websocketService.sendComment('1', '2');
    }

    handleLikeComment(item: any) {
        this.formLikeComment.get('id').setValue(item.id);
        this.formLikeComment.get('commentId').setValue(item.commentId);
        this.formLikeComment.get('userId').setValue(item.userId);
        this.formLikeComment.get('postId').setValue(item.postId);
        this.formLikeComment.get('commentText').setValue(item.commentText);
        // this.formLikeComment.get('createAt').setValue(item.createAt);
        // this.formLikeComment.get('updateAt').setValue(item.updateAt);
        this.formLikeComment.get('likeComment').setValue(1);
        this.formLikeComment.get('status').setValue(1);
        // this.api.updateComment(this.formLikeComment.value).toPromise().then(data => {
        //
        // });
        this.websocketService.sendComment('1', '2');

    }

    handleDisLikeComment(item: any) {
        this.formLikeComment.get('id').setValue(item.id);
        this.formLikeComment.get('commentId').setValue(item.commentId);
        this.formLikeComment.get('userId').setValue(item.userId);
        this.formLikeComment.get('postId').setValue(item.postId);
        this.formLikeComment.get('commentText').setValue(item.commentText);
        // this.formLikeComment.get('createAt').setValue(item.createAt);
        this.formLikeComment.get('updateAt').setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'));
        this.formLikeComment.get('likeComment').setValue(0);
        this.formLikeComment.get('status').setValue(1);
        // this.api.updateComment(this.formLikeComment.value).toPromise().then(data => {
        //
        // });
        this.websocketService.sendComment('1', '2');
    }

    reportComment(item: any) {
        this.isRefuse = true;
        this.dataReportComment = item;
    }

    handleOkRefuse() {
        this.formSearchPost = this.fb.group({
            dataReportId: Number(this.dataReportComment?.id),
            reportType: 2,
            userReportId: Number(this.idUserLocalstorage),
            reason: this.inputValue,
        });
        this.api.createReport(this.formSearchPost.value).subscribe((res: any) => {
            this.notificationService.showMessage('success', res.message);
            this.isRefuse = false;
        })
    }

    handleCancelRefuse() {
        this.isRefuse = false;
    }

    rating() {
        console.log('inputRating: ', this.inputRating)
        this.formRating = this.fb.group({
            postId: null,
            userId: null,
            rating: null,
        })
        this.api.updateRating(this.formRating.value).subscribe((res: any) => {
            console.log('res: ', res)
        })
    }
}
