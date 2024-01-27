import {Component, OnDestroy, OnInit} from '@angular/core';
import {Api} from "../../../../services/api";
import {NotificationService} from "../../../../services/notification.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,OnDestroy {
  formHandleStatusBill: FormGroup
  infoUser: any;
  curPage = 1;
  total: any;
  data: any;
  isRefuse = false;
  dataDetail: any;

  constructor(
    private api: Api,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private shareDataService: ShareDataService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem('user'))
  }
  ngOnDestroy(): void {
    this.shareDataService.setActivedNav('');
  }

  ngOnInit(): void {
    this.shareDataService.setActivedNav('hidden_2_nav');
    this.api.getBillByEmail(this.infoUser.email, this.curPage-1, 10).subscribe({
      next: (res) => {
        console.log('res-getBillByEmail: ', res)
        this.data = res.data.content;
        this.total = res.data.totalElements;
      }
    })
  }

  changePage() {
    this.api.getBillByEmail(this.infoUser.email, this.curPage-1, 10).subscribe({
      next: (res) => {
        this.data = res.data.content;
        this.total = res.data.totalElements;
      }
    })
  }

  handleConfirm(value?: any) {
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: 1
    })
    this.api.updateBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      this.changePage();
      this.notificationService.showMessage('success', 'Xác nhận đã nhận được hàng')
    })
  }

  handleWarning(value?: any) {
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: -2
    })
    this.api.updateBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      this.changePage();
      this.notificationService.showMessage('success', 'Đã gửi thông báo cho người quản lý')
    })
  }

  handleUndo(value?: any) {
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: 0
    })
    this.api.updateBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      this.changePage();
      this.notificationService.showMessage('success', 'Đã gửi thông báo hoàn hàng tới người quản lý')
    })
  }

  viewDetailBill(value: any) {
    console.log('view detail bill: ', value)
    this.dataDetail = value.details;
    this.isRefuse = true;
  }

  handleCancelViewDetailBill() {
    this.isRefuse = false
  }

}
