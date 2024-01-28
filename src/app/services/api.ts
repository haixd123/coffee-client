import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SearchModelEntity} from '../component/admin/search-model-entiry';
import {BaseService} from '../shared/base-service/base-service.service';
import {Comment} from '../component/admin/table-report/interface/comment';
import { Voucher } from '../component/admin/table-voucher/interface/voucher';

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

  //LikeComment
  updateLikeComment(value: any) {
    return this.post('/authors/likeComment/update', value);
  }

  getDataCommentOfPost(request:any):Observable<any> {
    return this.httpClient.post(`http://localhost:8080/api/authors/post/comment`, request);
  }

  getDetailListLikeComment(value: any) {
    return this.post('/authors/likeComment/findDetailTotalLikeCommentByPost', value);
  }



  //Notify
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

  //Bill
  getListBill(searchModel: SearchModelEntity) {
    return this.post('/authors/bill/search', searchModel);
  }


  createBill(searchModel: SearchModelEntity) {
    return this.post('/authors/bill/create', searchModel);
  }

  updateBill(value: any) {
    return this.post('/authors/bill/change-status', value);
  }

  deleteBill(value: any) {
    return this.post('/authors/bill/delete', value);
  }

  exportBill(searchModel: SearchModelEntity) {
    return this.postRequestFile1(searchModel);
  }

  getBillByEmail(
    email: string,
    page: number,
    size: number,
  ): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:8080/api/authors/bill/by-user/${email}`,
      {
        params: new HttpParams()
          .append('page', page + '')
          .append('size', size + '')
      }
    );
  }

  sortByPriceOrDate(
    sortBy: string,
    page: number,
    size: number,
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/authors/bill/sort',
      {
        params: new HttpParams()
          .append('sortBy', sortBy + '')
          .append('page', page + '')
          .append('size', size + '')
      }
    );
  }

  getBillByUser(
    name: string,
    page: number,
    size: number,
  ): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/authors/bill/by-user',
      {
        params: new HttpParams()
          .append('name', name + '')
          .append('page', page + '')
          .append('size', size + '')
      }
    );
  }

  //payment online

  createPaymentWithVnPay(searchModel: SearchModelEntity) {
    return this.post('/payment/authors/create-payment', searchModel);
  }

  getVnPaymentInfo(params: HttpParams) {
    return this.get('/payment/payment-info', params);
  }

  //User
  updateUser(searchModel: SearchModelEntity) {
    return this.post('/user/update', searchModel);
  }

  //comment

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
        .append('text', infix)
        .append('page', page + '')
        .append('size', size + '')
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
        .append('status', status + '')
          .append('page', page + '')
          .append('size', size + '')
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
        .append('status', status + '')
          .append('page', page + '')
          .append('size', size + '')
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
      params: new HttpParams()
      .append("username", username)
      .append("page", page+"")
      .append("size", size+'')
    })
  }

  getReportByIdAndType(page: number, size: number, type: number, id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports/by-id-and-type`, {
      params: new HttpParams()
      .append("dataId", id + "")
      .append("type", type + "")
      .append("page", page + "")
      .append("size", size + "")
    })
  }

  getSearchReport(page: number, size: number, reason: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authors/reports/search/${reason}`, {
      params: new HttpParams()
        .append('size', size + '')
        .append('page', page + '')
    })
  }

  deleteReport(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/authors/reports/${id}`)
  }

  //voucher
  getAllVoucher(page:number,size:number):Observable<any>{
    return this.httpClient.get(`http://localhost:8080/api/authors/voucher`,{
      params: new HttpParams()
      .append("page",page+"")
      .append("size",size+"")
    });
  }
  getMyVoucher(page:number,size:number,userId:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8080/api/authors/voucher/by-user/${userId}`,{
      params: new HttpParams()
      .append("page",page+"")
      .append("size",size+"")
    });
  }

  getAllVoucherExpectUserOwn(page:number,size:number,userId:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8080/api/authors/voucher/by-not-user/${userId}`,{
      params: new HttpParams()
      .append("page",page+"")
      .append("size",size+"")
    });
  }

  addVoucherToUse(voucherId:any,userId:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8080/api/authors/voucher/add-for-user`,{
      userId: userId,
      voucherId:voucherId
    })
  }
  getAllAndSortVoucher(page:number,size:number,type:string):Observable<any>{
    return this.httpClient.get(`http://localhost:8080/api/authors/voucher/sort-by-type`,{
      params: new HttpParams()
      .append("type",type)
      .append("page",page+"")
      .append("size",size+"")

    })
  }
  createVoucher(voucher: Voucher):Observable<any>{
    return this.httpClient.post(`http://localhost:8080/api/authors/voucher`,voucher);
  }
  updateVoucher(id:string,voucher:Voucher):Observable<any>{
    return this.httpClient.put(`http://localhost:8080/api/authors/voucher/${id}`,voucher);
  }
  deleteVoucher(id:string):Observable<any>{
    return this.httpClient.delete(`http://localhost:8080/api/authors/voucher/${id}`);
  }
  //bill

}
