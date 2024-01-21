import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchModelEntity} from '../component/admin/search-model-entiry';
import {BaseService} from '../shared/base-service/base-service.service';

// import {BaseService} from './base-service.service';


@Injectable({
  providedIn: 'root'
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
  getListPosts(searchModel: SearchModelEntity) {
    return this.post('/authors/posts/search', searchModel);
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

  createPaymentWithVnPay(searchModel: SearchModelEntity){
    return this.post('/payment/authors/create-payment', searchModel);
  }

  getVnPaymentInfo(params: HttpParams){
    return this.get('/payment/payment-info', params);
  }

  // User
  updateUser(searchModel: SearchModelEntity) {
    return this.post('/user/update', searchModel);
  }
}
