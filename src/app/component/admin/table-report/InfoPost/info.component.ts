import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {Api} from '../../api.service';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationService } from '../../../../services/notification.service';
import { NzUploadChangeParam } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
import { Api } from '../../../../services/api';
import { Post } from '../interface/post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-info-posts',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoPostsComponent implements OnInit {
  @Input() isInfo: boolean;
  @Input() data: Post;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
    private api: Api,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  handleCancel(value): void {
    this.isInfo = false;
    this.closePopup.emit(value);
  }
  safeHtml(value : any) : SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
