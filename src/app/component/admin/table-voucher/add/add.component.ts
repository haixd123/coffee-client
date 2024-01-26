import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../services/notification.service';
import {
  NzMessageService,
  NzUploadChangeParam,
  NzUploadFile,
} from 'ng-zorro-antd';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddVoucherComponent implements OnInit {
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  formAdd: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe
  ) {
    this.formAdd = this.fb.group({
      id: [null],
      description: ['', Validators.required],
      percentDiscount: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^\d+$/),
        ],
      ],
      voucherType: ['0', Validators.required],
      maxDiscount: [
        0,
        [
          Validators.required,
          Validators.min(1000),
          Validators.pattern(/^\d+$/),
        ],
      ],
      createdAt: [null],
      expiredAt: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {}

  showModal(): void {
    this.isAdd = true;
  }

  controlHasError(controlName: string, errorName: string) {
    return this.formAdd.controls[controlName].hasError(errorName);
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

  handleOk(): void {
    if (this.formAdd.valid) {
      this.api.createVoucher(this.formAdd.value).subscribe({
        next: (res) => {
          this.notificationService.showMessage(
            'success',
            'Thêm mới voucher thành công'
          );
          this.isAdd = false;
          this.handleCancel(true);
          this.formAdd.reset();
        },
        error: (err) => {
          this.notificationService.showMessage(
            'error',
            'Thêm mới voucher thất bại'
          );
          this.isAdd = false;
          this.handleCancel(true);
          this.formAdd.reset();
        },
      });
    }
    // setTimeout(() => {
    //   this.formAdd.get('image').setValue(this.urlImage);
    //   // this.formAdd.get('createDate').setValue(this.datePipe.transform(this.formAdd.get('createDateCur').value, 'dd/MM/yyyy'));
    //   this.formAdd.get('dateOfBirth').setValue(this.datePipe.transform(this.formAdd.get('dateOfBirthCur').value, 'dd/MM/yyyy'));
    //   this.http.post('http://localhost:8080/api/user/create', this.formAdd.value).toPromise().then((data: any) => {
    //     if (data.errorCode == '00') {
    //       this.notificationService.showMessage('success', 'Thêm mới tài khoản thành công');
    //       this.isAdd = false;
    //       this.handleCancel(true);
    //       this.formAdd.reset();
    //     } else {
    //       this.notificationService.showMessage('error', 'Thêm mới tài khoản thất bại');
    //       this.isAdd = false;
    //       this.handleCancel(true);
    //       this.formAdd.reset();
    //     }
    //   });
    // }, 2000);
  }

  handleCancel(value): void {
    this.isAdd = false;
    this.closePopup.emit(value);
  }
}
