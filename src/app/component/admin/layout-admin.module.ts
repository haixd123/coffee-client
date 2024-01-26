import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TableCoffeeBeanComponent } from './table-coffee-bean/table-coffee-bean.component';
import { TableEquipmentComponent } from './table-equipment/table-equipment.component';
import { TableUserComponent } from './table-user/table-user.component';
import { TablePostsComponent } from './table-posts/table-posts.component';

import { AddComponent } from './table-equipment/add/add.component';
import { EditComponent } from './table-equipment/edit/edit.component';
import { EditCoffeeBeanComponent } from './table-coffee-bean/edit/edit.component';
import { AddCoffeeBeanComponent } from './table-coffee-bean/add/add.component';
import { AddUserComponent } from './table-user/add/add.component';
import { EditUserComponent } from './table-user/edit/edit.component';
import { AddPostsComponent } from './table-posts/add/add.component';
import { EditPostsComponent } from './table-posts/edit/edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Api } from '../../services/api';
import { TableProductComponent } from './table-product/table-product.component';
import { EditProductComponent } from './table-product/edit/edit.component';
import { AddProductComponent } from './table-product/add/add.component';
import { TranslateModule } from '@ngx-translate/core';
import { BillComponent } from './table-bill/bill.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableCommentComponent } from './table-comment/table-comment.component';
import { TableReportComponent } from './table-report/table-report.component';
import { InfoPostsComponent } from './table-report/InfoPost/info.component';
import { InfoCommentComponent } from './table-report/InfoComment/info.component';
import { InfoUserComponent } from './table-report/InfoUser/info.component';
import { TableVoucherComponent } from './table-voucher/table-voucher.component';
import { AddVoucherComponent } from './table-voucher/add/add.component';
import { EditVoucherComponent } from './table-voucher/edit/edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    TableProductComponent,
    TableCoffeeBeanComponent,
    TableEquipmentComponent,
    TableUserComponent,
    AddComponent,
    EditComponent,
    TablePostsComponent,
    AddComponent,
    EditComponent,
    EditCoffeeBeanComponent,
    AddCoffeeBeanComponent,
    AddUserComponent,
    EditUserComponent,
    AddPostsComponent,
    EditPostsComponent,
    TableProductComponent,
    EditProductComponent,
    AddProductComponent,
    BillComponent,
    TableCommentComponent,
    TableReportComponent,
    InfoPostsComponent,
    InfoCommentComponent,
    InfoUserComponent,
    TableVoucherComponent,
    AddVoucherComponent,
    EditVoucherComponent
  ],
  imports: [
    NzFormModule,
    NgZorroAntdModule,
    SharedModule,
    CKEditorModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    TranslateModule,
    NgxChartsModule,
    // BsDatepickerModule.forRoot(),
    // AdminLayoutRoutingModule,
    // NzDropDownModule,
    // NzBreadCrumbModule,
  ],
  providers: [Api],
})
export class LayoutAdminModule {}
