import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {HomeComponent} from './component/home/home.component';
import {HomePostsComponent} from './component/home/posts/home-posts.component';
import {TableEquipmentComponent} from './component/admin/table-equipment/table-equipment.component';
import {TablePostsComponent} from './component/admin/table-posts/table-posts.component';
import {TableCoffeeBeanComponent} from './component/admin/table-coffee-bean/table-coffee-bean.component';
import {TableUserComponent} from './component/admin/table-user/table-user.component';
import {VietBaiComponent} from './component/home/viet-bai/viet-bai.component';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {EquipmentComponent} from './component/home/equipment/equipment.component';
import {PostsDetailComponent} from './component/home/detail/test/detail-posts/posts-detail.component';
import {CkeditorDetailComponent} from './component/home/detail/test/detail-coffee-bean/ckeditor-detail.component';
import {DetailEquipmentComponent} from './component/home/detail/test/detail-equipment/detail-equipment.component';
import {HomeCoffeeBeanComponent} from './component/home/coffee-bean/home-coffee-bean.component';
import {UserComponent} from './component/home/user/user.component';
import {InfoComponent} from './component/home/user/info/info.component';
import {MyPostsComponent} from './component/home/user/my-posts/my-posts.component';
import {DetailComponent} from './component/home/detail/detail.component';
import {SavePostsComponent} from './component/home/user/save-posts/save-posts.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {RoleGuard} from './role.guard';
// import {ContactComponent} from './component/home/contact/contact.component';
import {TableProductComponent} from './component/admin/table-product/table-product.component';
import {ProductComponent} from './component/home/product/product.component';
import {CheckoutComponent} from './component/home/checkout/checkout.component';
import {BillComponent} from './component/admin/table-bill/bill.component';
import { PaymentResultComponent } from './component/home/payment-result/paymen-result.component';
import {WaittingPostComponent} from './component/home/user/waitting-post/waitting-post.component';
import {DraftPostComponent} from './component/home/user/draft-post/draft-post.component';
import {RefusePostComponent} from './component/home/user/refuse-post/refuse-post.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/coffee-bean',
    pathMatch: 'full'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./component/admin/layout-admin.module').then(m => m.LayoutAdminModule),
      },
      {
        path: 'equipment',
        component: TableEquipmentComponent,
      },
      {
        path: 'posts',
        component: TablePostsComponent,
      },
      {
        path: 'coffee-bean',
        component: TableCoffeeBeanComponent,
      },
      {
        path: 'product',
        component: TableProductComponent,
      },
      {
        path: 'user',
        component: TableUserComponent,
      },
      {
        path: 'bill',
        component: BillComponent,
      }
    ],
    data: {
      breadcrumb: 'Home',
      expectedRole: 'ADMIN',
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        // redirectTo: '/coffee-bean',
        // pathMatch: 'full',
        loadChildren: () => import('./component/home/layout-home.module').then(m => m.LayoutHomeModule),
      },
      {
        path: 'coffee-bean',
        component: HomeCoffeeBeanComponent,
      },
      {
        path: 'posts',
        component: HomePostsComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'posts/:category',
        component: HomePostsComponent,
      },
      {
        path: 'write',
        component: VietBaiComponent,
      },
      {
        path: 'equipment',
        component: EquipmentComponent,
      },
      // {
      //   path: 'contact',
      //   component: ContactComponent,
      // },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'payment-result',
        component: PaymentResultComponent,
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./component/home/user/layout-user-home.module').then(m => m.LayoutUserHomeModule),
          },
          {
            path: 'info',
            component: InfoComponent,
          },
          {
            path: 'myPosts',
            component: MyPostsComponent,
          },
          {
            path: 'waittingPosts',
            component: WaittingPostComponent,
          },
          {
            path: 'savePosts',
            component: SavePostsComponent,
          },
          {
            path: 'draftPosts',
            component: DraftPostComponent,
          },
          {
            path: 'refusePosts',
            component: RefusePostComponent,
          }
        ],
        data: {
          breadcrumb: 'Home',
        }
      },
      {
        path: 'detail',
        component: DetailComponent,
        children: [

          {
            path: '',
            loadChildren: () => import('./component/home/detail/detail.module').then(m => m.DetailModule),
          },
          {
            path: 'coffee-bean/:name',
            component: CkeditorDetailComponent,
          },
          {
            path: 'equipment/:name',
            component: DetailEquipmentComponent,
          },
          {
            path: 'posts/:category/:id',
            component: PostsDetailComponent,
          }
        ]
      },
    ],
    data: {
      breadcrumb: 'Home',
    }
  },
  {
    path: 'auth',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ],
    data: {
      breadcrumb: 'Home',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
