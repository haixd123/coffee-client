import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {
  NgZorroAntdModule,
  NzButtonModule,
  NzCollapseModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzPaginationModule,
  NzSelectModule,
  NzTableModule,
  NzCalendarModule
} from 'ng-zorro-antd';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {FormatDatePipe} from './pipe/format-date.pipe';
import {SortPipe} from './pipe/sort.pipe';
import {FilterPipe} from './pipe/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzTableModule,
    NzPaginationModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzIconModule,
    NzLayoutModule,
    ScrollingModule,
    DragDropModule,
    NzCollapseModule,
    NgZorroAntdModule,
    NzNotificationModule,
    NzFormModule,
    NzResultModule,
    NzTagModule,
    NzDropDownModule,
    NzDatePickerModule,
    ScrollingModule,
    DragDropModule,
    NzBackTopModule,
    NzRadioModule,
    CKEditorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzTableModule,
    NzPaginationModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzIconModule,
    NzCollapseModule,
    NgZorroAntdModule,
    NzNotificationModule,

    NzFormModule,
    NzResultModule,
    NzTagModule,
    NzDropDownModule,
    NzDatePickerModule,
    ScrollingModule,
    DragDropModule,
    NzBackTopModule,
    NzRadioModule,
    BsDatepickerModule,
    FormatDatePipe,
    SortPipe,
    FilterPipe,
    // CKEditorModule,
    // EditorModule
  ],
  declarations: [FormatDatePipe, SortPipe, FilterPipe],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
