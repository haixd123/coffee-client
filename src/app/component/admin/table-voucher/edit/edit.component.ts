import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import {Api} from "../../../../services/api";

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditVoucherComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();


  formEdit: FormGroup;

  selectedFile: File;
  urlImage: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
    private api: Api,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      userName: [null, [Validators.required]],
      passWord: null,
      email: [null, [Validators.required]],
      name: null,
      address: null,
      age: null,
      role: null,
      phoneNumber: null,
      dateOfBirth: null,
      dateOfBirthCur: null,
      sex: null,
      // createDate: null,
      status: null,
      image: null
    });
  }

  ngOnChanges() {
    if (this.dataEdit) {
      console.log('dataedit: ', this.dataEdit);
      this.formEdit.reset();
      this.formEdit.patchValue({
        id: this.dataEdit.id,
        userName: this.dataEdit.userName,
        passWord: this.dataEdit.passWord,
        email: this.dataEdit.email,
        name: this.dataEdit.name,
        address: this.dataEdit.address,
        age: this.dataEdit.age,
        role: this.dataEdit.role,
        phoneNumber: this.dataEdit.phoneNumber,
        dateOfBirthCur: this.dataEdit.dateOfBirth,
        sex: this.dataEdit.sex == 'nam' ? '1' : this.dataEdit.sex == 'nữ' ? '2' : '3',
        createDate: this.dataEdit.createDate,
        status: this.dataEdit.status,
        image: this.dataEdit.image
      });
      this.urlImage = this.dataEdit.image;
      this.formEdit.get('id').setValue(this.dataEdit.id);
      this.formEdit.get('passWord').setValue(this.dataEdit.passWord);
    }
  }

  ngOnInit(): void {
  }

  get f() {
    return this.formEdit.controls;
  }

  showModal(): void {
    this.isEdit = true;
  }

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
    // );
  }

  handleOk(): void {
    this.formEdit.get('image').setValue(this.urlImage);
    this.formEdit.get('dateOfBirth').setValue(this.datePipe.transform(this.formEdit.get('dateOfBirthCur').value, 'dd/MM/yyyy'));
    this.api.updateUser(this.formEdit.value).toPromise().then((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
        this.isEdit = false;
        this.handleCancel(true);
        this.formEdit.reset();
      } else {
        this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
        this.isEdit = false;
        this.handleCancel(true);
        this.formEdit.reset();
      }
    });

  }

  handleCancel(value: any): void {
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
