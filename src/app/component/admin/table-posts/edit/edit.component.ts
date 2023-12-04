import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import {Api} from '../../../../services/api';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPostsComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;

  selectedFile: File;
  urlImage: string;
  dateCreatedAt: string;

  formEdit: FormGroup;
  isVisible = false;
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
      title: [null, [Validators.required]],
      status: null,
      imagePath: null,
      contentPost: null,
      contentDetail: null,
      createdAt: null,
      createdAtCur: null,
      updatedAt: null,
      category: null,
      like1: null,
      comment: null,
    });
  }

  ngOnChanges() {
    // if (this.isEdit) {
    //     this.formEdit.reset();
    // }
    console.log('dataEdit: ', this.dataEdit);
    this.formEdit.patchValue({
      id: this.dataEdit.id,
      title: [this.dataEdit.title, [Validators.required]],
      status: this.dataEdit.status,
      imagePath: this.dataEdit.imagePath,
      contentPost: this.dataEdit.contentPost,
      contentDetail: this.dataEdit.contentDetail,
      userId: this.dataEdit.userId,
      createdAt: this.dataEdit.createdAt,
      category: this.dataEdit.category,
      like1: this.dataEdit.like1,
      comment: this.dataEdit.comment,
    });
    this.urlImage = this.dataEdit.imagePath;
    this.dataEdit.get('id').setValue(this.dataEdit.id);
    this.dataEdit.get('userId').setValue(this.dataEdit.userId);
    this.dataEdit.get('like1').setValue(this.dataEdit.like1);
    this.dataEdit.get('comment').setValue(this.dataEdit.comment);
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
    this.formEdit.get('imagePath').setValue(this.dataEdit.imagePath);
    this.formEdit.get('createdAt').setValue(this.datePipe.transform(this.dataEdit.createdAt, 'dd/MM/yyyy'));
    this.api.updatePosts(this.formEdit.value).toPromise().then((data: any) => {
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

    this.handleCancel(true);

    this.isEdit = false;

  }

  handleCancel(value: any): void {
    this.closePopup.emit(value);

    this.isEdit = false;
  }

}
