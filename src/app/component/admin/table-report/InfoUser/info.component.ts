import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {Api} from '../../api.service';
import {HttpClient} from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotificationService} from '../../../../services/notification.service';
import {NzUploadChangeParam} from 'ng-zorro-antd';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import {Api} from '../../../../services/api';
import { User } from '../interface/user';


@Component({
  selector: 'app-info-user',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoUserComponent implements OnInit {
  @Input() isInfo: boolean;
  @Input() data: User;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
    public datePipe: DatePipe,
    private api: Api,
  ) {
    
  }

  ngOnInit(): void {
    
  }
 

  handleCancel(value): void {
    this.isInfo = false;
    this.closePopup.emit(value);
  }
}
