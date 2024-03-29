import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../services/notification.service';
import { NzUploadChangeParam } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
import { Api } from '../../../../services/api';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
    private api: Api
  ) {
    this.formEdit = this.fb.group({
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
      voucherType: ['1', Validators.required],
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

  ngOnChanges() {
    if (this.dataEdit) {
      this.formEdit.reset();
      this.formEdit.patchValue({
        id: this.dataEdit.id,
        description: this.dataEdit.description,
        percentDiscount: this.dataEdit.percentDiscount,
        voucherType: this.dataEdit.voucherType+"",
        maxDiscount: this.dataEdit.maxDiscount,
        createdAt: this.dataEdit.createdAt,
        expiredAt: new Date(this.dataEdit.expiredAt),
      });
    }
  }

  ngOnInit(): void {}

  controlHasError(controlName: string, errorName: string) {
    return this.formEdit.controls[controlName].hasError(errorName);
  }

  get f() {
    return this.formEdit.controls;
  }

  showModal(): void {
    this.isEdit = true;
  }

  // onUpload(info: NzUploadChangeParam) {
  //   this.isLoading = true;
  //   this.selectedFile = info.file.originFileObj;
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('files', this.selectedFile, this.selectedFile.name);
  //   const filePath = `'/image' + '/' + ${Math.random()} + '/' + ${
  //     this.selectedFile.name
  //   }`;
  //   const fileRef = this.storage.ref(filePath);
  //   this.storage
  //     .upload(filePath, this.selectedFile)
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((url) => {
  //           this.isLoading = false;
  //           this.urlImage = url;
  //         });
  //       })
  //     )
  //     .subscribe();
  //   // .subscribe((res) => {
  //   //     if (res.status === 200) {
  //   //       console.log('success | res : ', res);
  //   //     } else {
  //   //       console.log('failed');
  //   //     }
  //   //   }
  //   // );
  // }

  handleOk(): void {
    if(this.formEdit.valid){
      let id = this.formEdit.get('id').value;
      this.api.updateVoucher(id,this.formEdit.value).subscribe({
        next: (res) => {
          this.notificationService.showMessage(
            'success',
            'Sửa voucher thành công'
          );
          this.isEdit = false;
          this.handleCancel(true);
          this.formEdit.reset();
        },
        error: (err) => {
          this.notificationService.showMessage(
            'error',
            'Sửa voucher thất bại'
          );
          this.isEdit = false;
          this.handleCancel(true);
          this.formEdit.reset();
        },
      })
    }
  }

  handleCancel(value: any): void {
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
