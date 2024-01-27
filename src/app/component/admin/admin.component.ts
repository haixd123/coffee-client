import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {Router} from '@angular/router';
import {ShareDataService} from "../../services/share-data.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
//   styles: [`
//     .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px 30px 16px 0;
//   float: left;
// }
//
// .header-menu {
//   line-height: 64px;
// }
//
// .sider-menu {
//   height: 100%;
//   border-right: 0;
// }
//
// .inner-layout {
//   padding: 0 24px 24px;
// }
//
// nz-breadcrumb {
//   margin: 16px 0;
// }
//
// nz-content {
//   background: #fff;
//   padding: 24px;
//   min-height: 280px;
// }
// `]
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  infoUser: any;
  nameHeader: string;

  name: string;
  status: string;
  width: number = window.innerWidth;

  isCollapsed = false;

  constructor(
    private router: Router,
    private shareDataService: ShareDataService,

  ) {
    this.infoUser = JSON.parse(localStorage.getItem('user'));

  }

  ngOnInit(): void {
  }

  changeNav(tabName: string) {
    this.shareDataService.setActivedNav(tabName);
  }

  ChangeValueHeader(value) {
    this.nameHeader = value;
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

}
