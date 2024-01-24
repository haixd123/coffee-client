import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dataSubjectSearch = new BehaviorSubject<any>('');
  private dataSubjectCategory = new BehaviorSubject<any>('');
  private dataSubjectEditPosts = new BehaviorSubject<any>(null);
  private dataSubjectIdPost = new BehaviorSubject<any>('');
  private isResetFormCreatePost = new BehaviorSubject<any>('');

  dataSearch$ = this.dataSubjectSearch.asObservable();
  dataCategory$ = this.dataSubjectCategory.asObservable();
  dataEditPosts$ = this.dataSubjectEditPosts.asObservable();
  dataIdPost$ = this.dataSubjectIdPost.asObservable();
  isResetFormCreatePost$ = this.isResetFormCreatePost.asObservable();

  sendDataSearch(data: string) {
    this.dataSubjectSearch.next(data);
  }

  sendDataCategory(data: string) {
    this.dataSubjectCategory.next(data);
  }

  sendDataEditPosts(data: string) {
    this.dataSubjectEditPosts.next(data);
  }

  sendDataIdPost(data: any) {
    this.dataSubjectIdPost.next(data);
  }

  sendDataResetFormCreatePost(data: any) {
    this.dataSubjectIdPost.next(data);
  }
}
