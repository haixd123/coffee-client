import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {HomePostsComponent} from './posts/home-posts.component';
import {VietBaiComponent} from './viet-bai/viet-bai.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {TestCkeditorComponent} from './test-ckeditor/test-ckeditor.component';
import {EquipmentComponent} from './equipment/equipment.component';
import {HomeCoffeeBeanComponent} from './coffee-bean/home-coffee-bean.component';
import {UserComponent} from './user/user.component';
import {NotificationComponent} from './notification/notification.component';
import {DetailModule} from './detail/detail.module';
import { ContactComponent } from './contact/contact.component';
import {Api} from '../../services/api';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {CarouselModule} from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [CheckoutComponent, HomeComponent, ProductComponent, HomePostsComponent, HomeCoffeeBeanComponent, VietBaiComponent, TestCkeditorComponent, EquipmentComponent, UserComponent, NotificationComponent, ContactComponent, ProductComponent, CheckoutComponent],
  imports: [NzFormModule, NgZorroAntdModule, SharedModule, DetailModule,
    RouterModule.forChild([]),
    // HomeLayoutRoutingModule,
    NzDropDownModule,
    NzBreadCrumbModule, CKEditorModule, DetailModule, CarouselModule],
  exports: [
    NotificationComponent
  ],
  providers: [Api]
})
export class LayoutHomeModule {
}
