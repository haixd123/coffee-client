import {Component, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzMessageService, NzModalService, NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../../../../services/notification.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Api} from '../../../../services/api';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnChanges {

  formAdd: FormGroup;

  searchModel: SearchModelEntity = new SearchModelEntity();
  data: any[];
  total: number;
  idUserLocalstorage: string;
  isUpdateName = true;
  isUpdateDateOfBirth = true;
  isUpdateSex = true;
  isUpdatePhone = true;
  isUpdateEmail = true;

  isCancelUpdateName: boolean;
  isCancelUpdateDateOfBirth: boolean;
  isCancelUpdateSex: boolean;
  isCancelUpdatePhone: boolean;
  isCancelUpdateEmail: boolean;

  isVisible = false;

  selectedFile: File;
  urlImage: string;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private notificationService: NotificationService,
    private router: Router,
    public datePipe: DatePipe,
    private api: Api,
  ) {
    this.formAdd = this.fb.group({
      id: JSON.parse(localStorage.getItem('user')).id,
      name: JSON.parse(localStorage.getItem('user')).name ? JSON.parse(localStorage.getItem('user')).name : '',
      // dateOfBirth: JSON.parse(localStorage.getItem('user')).dateOfBirth ? this.datePipe.transform(JSON.parse(localStorage.getItem('user')).dateOfBirth, 'dd/mm/yyyy') : '',
      dateOfBirth: null,
      dateOfBirthCur: null,
      sex: JSON.parse(localStorage.getItem('user')).sex ? JSON.parse(localStorage.getItem('user')).sex : '',
      phoneNumber: JSON.parse(localStorage.getItem('user')).phoneNumber ? JSON.parse(localStorage.getItem('user')).phoneNumber : '',
      image: JSON.parse(localStorage.getItem('user')).image ? JSON.parse(localStorage.getItem('user')).image : null,
      email: JSON.parse(localStorage.getItem('user')).email ? JSON.parse(localStorage.getItem('user')).email : '',
    });
    this.handleSearch();
    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnChanges() {
    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleUpdate(searchModel: SearchModelEntity) {
    this.api.getListUser(this.searchModel).toPromise().then((data: any) => {
      console.log('data: ', data)
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 50;
    this.handleUpdate(this.searchModel);
  }

  handleSubmidUpdateName() {
    this.isUpdateName = false;
    this.isCancelUpdateName = true;
  }

  handleSubmidUpdateEmail() {
    this.isUpdateEmail = false;
    this.isCancelUpdateEmail = true;
  }

  handleSubmidUpdateDateOfBirth() {
    this.isUpdateDateOfBirth = false;
    this.isCancelUpdateDateOfBirth = true;
  }

  handleSubmidUpdateSex() {
    this.isUpdateSex = false;
    this.isCancelUpdateSex = true;
  }

  handleSubmidUpdatePhoneNumber() {
    this.isUpdatePhone = false;
    this.isCancelUpdatePhone = true;
  }

  cancelUpdateName() {
    this.isUpdateName = true;
    this.isCancelUpdateName = false;
  }

  cancelUpdateEmail() {
    this.isUpdateEmail = true;
    this.isCancelUpdateEmail = false;
  }

  cancelUpdateDateOfBirth() {
    this.isUpdateDateOfBirth = true;
    this.isCancelUpdateDateOfBirth = false;
  }

  cancelUpdateSex() {

    this.isUpdateSex = true;
    this.isCancelUpdateSex = false;
  }

  cancelUpdatePhoneNumber() {
    this.isUpdatePhone = true;
    this.isCancelUpdatePhone = false;
  }

  onUpload(info: NzUploadChangeParam) {
    this.selectedFile = info.file.originFileObj;
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.urlImage = url;
        });
      })
    ).subscribe();
    setTimeout(() => {
      this.isVisible = true;
    }, 2000);
  }

  handleChangeAvatar(): void {
    setTimeout(() => {
      this.formAdd.get('image').setValue(this.urlImage);
      this.http.post('http://localhost:8080/api/authors/user/updateInfo', this.formAdd.value).toPromise().then((data: any) => {
        this.http.post(`http://localhost:8080/api/authors/user/search/${data.data.id}`, data.data.id).subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          // this.handleSearch();
          // setTimeout(() => {
          //   this.cancelUpdateName();
          //   this.cancelUpdateDateOfBirth();
          //   this.cancelUpdateSex();
          //   this.cancelUpdatePhoneNumber();
          // }, 100);
          window.location.reload();

        });
      });
      this.handleCancel();
      this.formAdd.reset();
      this.isVisible = false;
    }, 2000);
  }

  handleUpdateInfo() {
    this.formAdd.get('dateOfBirth').setValue(this.datePipe.transform(this.formAdd.get('dateOfBirthCur').value, 'dd/MM/yyyy'));
    if (this.formAdd.get('name').value) {
      this.http.post('http://localhost:8080/api/authors/user/updateInfo', this.formAdd.value).toPromise().then((data: any) => {
        this.http.post(`http://localhost:8080/api/authors/user/search/${data.data.id}`, data.data.id).subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.handleSearch();
          this.cancelUpdateName();
          this.cancelUpdateDateOfBirth();
          this.cancelUpdateSex();
          this.cancelUpdatePhoneNumber();
          this.cancelUpdateEmail();
        });
      });
    } else {
      alert('Tên người dùng không được để trống!')
    }

  }

}
