import { Component, OnInit } from '@angular/core';
import {Api} from "../../../../services/api";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private api: Api,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.api.getBillByUser('nm1', 0, 10).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}
