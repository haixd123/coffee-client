import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {Api} from '../../../services/api';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {DatePipe} from '@angular/common';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})


export class BillComponent implements OnInit {
  formSearch: FormGroup;
  formHandleStatusBill: FormGroup

  data: any[];
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;
  pageSizeOptions: number[] = [10, 50, 100];
  pageSize = 10;


  view: any[] = [1400, 430];
  legendTitle: string = 'Products';
  legendPosition: string = 'below';
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  xAxisLabel: string = 'Products';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;
  yAxisTicks: any[] = [100000, 500000, 1500000, 2500000, 3500000];
  animations: boolean = true; // animations on load
  showGridLines: boolean = true; // grid lines
  showDataLabel: boolean = true; // numbers on bars
  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F', '#0067EB']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'
  barPadding: number = 5;
  tooltipDisabled: boolean = false;
  roundEdges: boolean = false;
  dataChart: any;

  test = 12000;
  isRefuse = false;
  dataDetail: any;
  dataChartTotal: any;

  specificTotal: any;
  constructor(
    private fb: FormBuilder,
    public validateService: ValidateService,
    private api: Api,
    public datePipe: DatePipe,
    private notificationService: NotificationService,
    private http: HttpClient,
  ) {
    this.formSearch = this.fb.group({
      email: null,
    });
  }

  ngOnInit(): void {
    // this.handleSearch();
    // this.handleSearchByEmail();
    this.http.get('http://localhost:8080/api/authors/bill').subscribe((res: any) => {
      console.log('res all bill: ', res)
      this.dataChartTotal = res.data.content
      this.data = res.data.content;
      this.total = res.data.totalElements;

      const totalByMonth = {};
      this.data.forEach(purchase => {
        // this.datePipe.transform(purchase.createDate, 'dd/MM/yyyy');
        // console.log('month: ', purchase.createDate);
        const month = this.datePipe.transform(purchase.createDate, 'dd/MM/yyyy').split('/').splice(1, 2).join('/');
        // month = purchase.createDate.split('-')[1];
        if (!totalByMonth[month]) {
          totalByMonth[month] = 0;
        }
        totalByMonth[month] += Number(purchase.total);
      });
      const newArray = Object.entries(totalByMonth).map(([month, total]) => ({month, total}));
      this.dataChart = Object.entries(totalByMonth).map(([month, total]) => ({month, total}));
      // for (const item of newArray)
      this.dataChart = this.dataChart.map(item => {
        return {
          'name': `${item.month}`,
          'value': `${item.total}`
        };
      });
      return newArray;
    })
  }

  formatString(input: string): string {
    return input.toUpperCase();
  }

  formatNumber(input: number): number {
    return input;
  }

  handleUpdate() {

    // this.searchModel.pageIndex = 1;
    // if (this.curPage > 1) {
    //   this.searchModel.pageIndex = this.curPage;
    // }
    // this.searchModel.pageSize = 10;
    // if (this.formSearch.get('email').value == '') {
    //   this.formSearch.get('email').setValue(null);
    // }
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value)
    // this.api.getListBill(this.searchModel).toPromise().then((data: any) => {
    //   console.log('this.curPage: ', this.curPage)
    //   this.data = data.data;
    //   this.total = data.optional;
    // });

  }

  handleSort(value?: any) {
    this.api.sortByPriceOrDate(value, 0, 10).subscribe({
      next: (res) => {
        this.data = res.data.content;
        this.total = res.data.totalElements;
      }
    })
  }

  handleSearchByEmail(event?: any) {
    if (this.formSearch.get('email').value == '' || this.formSearch.get('email').value == null) {
      this.api.getAllBillByPageable(this.curPage - 1, 10).subscribe({
        next: (res: any) => {
          console.log('content all bill change page :: ', res.data.content);
          this.data = res.data.content;
          this.total = res.data.totalElements;
        }
      })
    } else {
      this.api.getBillByEmail(this.formSearch.get('email').value, this.curPage - 1, 10).subscribe({
        next: (res: any) => {
          console.log('content search by email :: ', res.data.content);
          this.data = res.data.content;
          this.total = res.data.totalElements;
        }
      })
    }

  }

  handleSearch() {
    // this.api.getBillByEmail(this.curPage - 1, 10).subscribe({
    //   next: (res: any) => {
    //     console.log('content all bill change page :: ', res.data.content);
    //     this.data = res.data.content;
    //     this.total = res.data.totalElements;
    //   }
    // })
  }

  changePage() {
    this.api.getAllBillByPageable(this.curPage - 1, 10).subscribe({
      next: (res: any) => {
        console.log('content all bill change page :: ', res.data.content);
        this.data = res.data.content;
        this.total = res.data.totalElements;
      }
    })
  }


  onPageSizeChange(value: any) {
    this.pageSize = value;
  }


  export() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = this.pageSize;
    this.api.exportBill(this.searchModel).subscribe((res: any) => {
      console.log('res: ', res);
      const reportFile = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      let fileName = 'BAO_CAO_TONG_HOP_VIETQR';
      let date = '';
      date = this.datePipe.transform(new Date(), 'ddMMyyyy');
      fileName = `${fileName}_${date}`;
      saveAs(reportFile, fileName + '.xlsx');
      // if (res.errorCode == '00') {
      //   this.notificationService.showMessage('success', 'success');
      // } else {
      //   this.notificationService.showMessage('error', 'error');
      // }
    }, error => console.log('err: ', error));
  }

  handleOk(value: any) {
    //đồng ý thì set status -1 để thể hiện cho khách hoàn hàng
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: -1
    })
    this.api.updateBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      console.log('res update bill ok: ', res)
      this.notificationService.showMessage('success', 'Bạn đã đồng ý hoàn tiền cho khách hàng')
    })
  }

  handleOkRefuse(value: any) {
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: 2
    })
    this.api.updateBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      console.log('res update bill ok: ', res)
      this.notificationService.showMessage('success', 'Bạn không đồng ý hoàn tiền cho khách hàng')
    })
  }

  handleDelete(value: any) {
    this.formHandleStatusBill = this.fb.group({
      billId: value.id,
      status: 2
    })
    this.api.deleteBill(this.formHandleStatusBill.value).subscribe((res: any) => {
      console.log('res update bill ok: ', res)
      this.notificationService.showMessage('success', 'Xóa hóa đơn thành công')
    })
  }

  viewDetailBill(value: any) {
    console.log('view detail bill: ', value)
    this.dataDetail = value.details;
    this.isRefuse = true;
    this.specificTotal = value.total;
  }

  handleCancelViewDetailBill() {
    this.isRefuse = false
  }

}
