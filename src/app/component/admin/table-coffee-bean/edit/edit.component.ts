import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Api} from '../../../../services/api';

@Component({
  selector: 'app-edit-coffee-bean',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditCoffeeBeanComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;

  selectedFile: File;
  urlImage: string;

  formEdit: FormGroup;
  srcImg: string;
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    private api: Api,
  ) {
    this.formEdit = this.fb.group({
      id: null,
      name: [null, [Validators.required]],
      title: null,
      status: null,
      image: null,
      contentCoffee: null
    });
  }


  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      name: [this.dataEdit.name, [Validators.required]],
      title: this.dataEdit.title,
      status: this.dataEdit.status,
      image: this.dataEdit.image,
      contentCoffee: this.dataEdit.contentCoffee,
    });
    this.urlImage = this.dataEdit.image;
  }

  ngOnInit(): void {
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
    this.formEdit.get('id').setValue(this.dataEdit.id);
    this.formEdit.get('image').setValue(this.urlImage);
    this.api.updateCoffeeBean(this.formEdit.value).toPromise().then((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Sửa bài đăng thành công');
        this.handleCancel(true);
      } else {
        this.notificationService.showMessage('error', 'Sửa bài đăng thất bại');
        this.handleCancel(true);
      }
      this.isEdit = false;
      this.formEdit.reset();
    });
  }


  handleCancel(value: any): void {
    this.isEdit = false;
    this.closePopup.emit(value);
  }

  get f() {
    return this.formEdit.controls;
  }
}
