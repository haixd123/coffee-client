import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzMessageService, NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../../services/auth.service';


@Component({
  selector: 'app-add-voucher',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddVoucherComponent implements OnInit {
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  formAdd: FormGroup;

  image: any;

  selectedFile: File;
  urlImage: any;
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
  ) {
    this.formAdd = this.fb.group({
      userName: [null, [Validators.required]],
      passWord: null,
      email: [null, [Validators.required]],
      name: null,
      address: null,
      age: null,
      role: null,
      phoneNumber: null,
      dateOfBirthCur: null,
      dateOfBirth: null,
      sex: '1',
      createDateCur: null,
      createDate: null,
      status: null,
      image: null
    });
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isAdd = true;
  }

  get f() {
    return this.formAdd.controls;
  }


  // handleChange(info: NzUploadChangeParam): void {
  //   // console.log('info: ', info.fileList.originFileObj[0]);
  //   console.log('info: ', info.file.originFileObj);
  // }
  //
  // public onFileChanged(event) {
  //   this.selectedFile = event.target.files[0];
  //   console.log('this.selectedFile: ', this.selectedFile);
  // }

  onUpload(info: NzUploadChangeParam) {
    this.isLoading = true;
    this.selectedFile = info.file.originFileObj;
    const uploadImageData = new FormData();
    uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
    const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.isLoading = false;
          this.urlImage = url;
        });
      })
    ).subscribe();
    // .subscribe((res) => {
    //     if (res.status === 200) {
    //       console.log('success | res : ', res);
    //     } else {
    //       console.log('failed');
    //     }
    //   }
    // );/
  }


  handleOk(): void {

    setTimeout(() => {
      this.formAdd.get('image').setValue(this.urlImage);
      // this.formAdd.get('createDate').setValue(this.datePipe.transform(this.formAdd.get('createDateCur').value, 'dd/MM/yyyy'));
      this.formAdd.get('dateOfBirth').setValue(this.datePipe.transform(this.formAdd.get('dateOfBirthCur').value, 'dd/MM/yyyy'));
      this.http.post('http://localhost:8080/api/user/create', this.formAdd.value).toPromise().then((data: any) => {
        if (data.errorCode == '00') {
          this.notificationService.showMessage('success', 'Thêm mới tài khoản thành công');
          this.isAdd = false;
          this.handleCancel(true);
          this.formAdd.reset();
        } else {
          this.notificationService.showMessage('error', 'Thêm mới tài khoản thất bại');
          this.isAdd = false;
          this.handleCancel(true);
          this.formAdd.reset();
        }
      });
    }, 2000);

  }

  handleCancel(value): void {
    this.isAdd = false;
    this.closePopup.emit(value);
  }

}
