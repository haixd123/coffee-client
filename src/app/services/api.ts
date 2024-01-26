import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchModelEntity} from '../component/admin/search-model-entiry';
import {BaseService} from '../shared/base-service/base-service.service';
import {Comment} from '../component/admin/table-report/interface/comment';

// import {BaseService} from './base-service.service';

@Injectable({
  providedIn: 'root',
})
// export class ImgUploadService extends BaseService {
export class Api extends BaseService {
  // imgUpload(url: string, formData: FormData): Observable<any> {
  //   return this.http.post(url, formData);
  // }

  //CoffeeBean
  getListCoffee(searchModel: SearchModelEntity) {
    return this.post('/authors/coffee/search', searchModel);
  }

  createCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/create', searchModel);
  }

  updateCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/update', searchModel);
  }

  deleteCoffeeBean(searchModel: SearchModelEntity) {
    return this.post('/coffee/delete', searchModel);
  }

  //Equipment
  getListEquipment(searchModel: SearchModelEntity) {
    return this.post('/authors/equipment/search', searchModel);
  }

  createEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/create', searchModel);
  }

  updateEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/update', searchModel);
  }

  deleteEquipment(searchModel: SearchModelEntity) {
    return this.post('/equipment/delete', searchModel);
  }

  //Posts

  getListPostsAdmin(value: any) {
    return this.post('/authors/posts/searchAdmin', value);
  }

  getListPosts(searchModel: SearchModelEntity) {
    return this.post('/authors/posts/search', searchModel);
  }

  getDetailPost(value: any) {
    return this.post('/authors/posts/searchDetail', value);
  }

  getListCategoryPosts(searchModel: SearchModelEntity) {
    return this.post('/authors/posts/search-list-category', searchModel);
  }

  getListTotalPosts(searchModel: SearchModelEntity) {
    return this.post('/authors/posts/searchTotalPost', searchModel);
  }

  createPosts(searchModel: SearchModelEntity) {
    return this.post('/posts/create', searchModel);
  }

  updatePosts(searchModel: SearchModelEntity) {
    return this.post('/posts/update', searchModel);
  }

  deletePosts(searchModel: SearchModelEntity) {
    return this.post('/posts/delete', searchModel);
  }

  changeStatusPost(postId: number, status: number) {
    return this.httpClient.post(`http://localhost:8080/api/posts/${postId}/change-status/${status}`, null);
  }

  getListRating(value: any) {
    return this.post('/authors/post-rating/getListRating', value);
  }

  updateRating(value: any) {
    return this.post('/authors/post-rating', value);
  }

  //Product
  getListProduct(searchModel: SearchModelEntity) {
    return this.post('/authors/product/search', searchModel);
  }

  createProduct(searchModel: SearchModelEntity) {
    return this.post('/product/create', searchModel);
  }

  updateProduct(searchModel: SearchModelEntity) {
    return this.post('/product/update', searchModel);
  }

  deleteProduct(searchModel: SearchModelEntity) {
    return this.post('/product/delete', searchModel);
  }

  //////////
  //Comment
  getTotalCommentPost(searchModel: SearchModelEntity) {
    return this.post('/authors/comment/searchTotalCommentPost', searchModel);
  }

  getListComment(searchModel: SearchModelEntity) {
    return this.post('/authors/comment/search', searchModel);
  }

  createComment(searchModel: SearchModelEntity) {
    return this.post('/authors/comment/create', searchModel);
  }

  updateComment(searchModel: SearchModelEntity) {
    return this.post('/comment/update', searchModel);
  }

  deleteComment(searchModel: SearchModelEntity) {
    return this.post('/comment/delete', searchModel);
  }

  //LikePosts
  getTotalLikePost(searchModel: SearchModelEntity) {
    return this.post('/authors/LikePosts/searchTotalLikePost', searchModel);
  }

  getListLikePosts(searchModel: SearchModelEntity) {
    return this.post('/authors/LikePosts/search', searchModel);
  }

  isLike(searchModel: SearchModelEntity) {
    return this.post('/LikePosts/create', searchModel);
  }

  // Notify
  // createSqlGetListfromUser(searchModel: SearchModelEntity) {
  //   return this.post('/authors/notify/search-list-from-user', searchModel);
  // }
  //
  // createSqlGetListIsCommentPost(searchModel: SearchModelEntity) {
  //   return this.post('/authors/notify/search-list-isComment-post', searchModel);
  // }
  //
  // createSqlGetListIsReplyComment(searchModel: SearchModelEntity) {
  //   return this.post('/authors/notify/search-list-isReply-comment', searchModel);
  // }

  createNotify(searchModel: SearchModelEntity) {
    return this.post('/authors/notify/create', searchModel);
  }

  deleteNotify(searchModel: SearchModelEntity) {
    return this.post('/notify/delete', searchModel);
  }

  //SavePosts
  getListSavePosts(searchModel: SearchModelEntity) {
    return this.post('/authors/save-posts/search', searchModel);
  }

  isSave(searchModel: SearchModelEntity) {
    return this.post('/save-posts/update', searchModel);
  }

  //user
  getListUser(searchModel: SearchModelEntity) {
    return this.post('/authors/user/search', searchModel);
  }

  // Bill
  getListBill(searchModel: SearchModelEntity) {
    return this.post('/authors/bill/search', searchModel);
  }

  createBill(searchModel: SearchModelEntity) {
    return this.post('/authors/bill/create', searchModel);
  }

  exportBill(searchModel: SearchModelEntity) {
    return this.postRequestFile1(searchModel);
  }

  // payment online

  createPaymentWithVnPay(searchModel: SearchModelEntity) {
    return this.post('/payment/authors/create-payment', searchModel);
  }

  getVnPaymentInfo(params: HttpParams) {
    return this.get('/payment/payment-info', params);
  }

  // User
  updateUser(searchModel: SearchModelEntity) {
    return this.post('/user/update', searchModel);
  }

  // comment

  changeStatusComment(commentId: number, status: number) {
    return this.httpClient.post(`http://localhost:8080/api/authors/comment/${commentId}/change-status/${status}`, null);
  }

  getAllPostByTypeAndTime(
    type: string,
    time: string,
    // infix: string
    // pageable: null,
    page: number,
    size: number,
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/authors/posts/by-favor',
      {
        params: new HttpParams()
          .append('type', type + '')
          .append('time', time + '')
          .append('page', page + '')
          .append('size', size + '')
          // .append('pageable', null + '')
          // .append('text', infix),
      }
    );
  }

  getAllCommentByCommentContaining(
    page: number,
    size: number,
    infix: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/authors/comment/by-content',
      {
        params: new HttpParams()
          .append('page', page + '')
          .append('size', size + '')
          .append('text', infix),
      }
    );
  }

  getAllCommentByUserId(
    page: number,
    size: number,
    userId: number,
    status: number,
  ): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/authors/comment/by-user/${userId}`,
      {
        params: new HttpParams()
          .append('page', page + '')
          .append('size', size + '')
          .append('status', status + '')
      }
    );
  }

  getAllCommentByPostId(
    page: number,
    size: number,
    postId: number,
    status: number
  ): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/authors/comment/by-post/${postId}`,
      {
        params: new HttpParams()
          .append('page', page + '')
          .append('size', size + '')
          .append('status', status + '')
      }
    );
  }

  getAllCommentByStatus(
    page: number,
    size: number,
    status: number
  ): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/authors/comment/by-status/${status}`,
      {
        params: new HttpParams()
          .append('page', page + '')
          .append('size', size + '')
      }
    );
  }

  // report
  createReport(value: any) {
    console.log('success: ')
    return this.post('/authors/reports', value)
  }

  getAllReport(page: number, size: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports`, {
      params: new HttpParams().append('page', page + '')
        .append('size', size + '')
    })
  }

  getReportByUser(page: number, size: number, username: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports/by-user`, {
      params: new HttpParams().append("username", username)
    })
  }

  getReportByIdAndType(page: number, size: number, type: number, id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports/by-id-and-type`, {
      params: new HttpParams().append("dataId", id + "").append("type", type + "")
    })
  }

  getSearchReport(page: number, size: number, reason: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports/search/${reason}`, {
      params: new HttpParams().append('page', page + '')
        .append('size', size + '')
    })
  }

  deleteReport(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/authors/reports/${id}`)
  }

  // voucher

  // bill
  
}
