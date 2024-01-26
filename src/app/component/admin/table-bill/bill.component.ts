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


  constructor(
    private fb: FormBuilder,
    public validateService: ValidateService,
    private api: Api,
    public datePipe: DatePipe,
    private notificationService: NotificationService,
    private http: HttpClient,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      name: null,
    });
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  formatString(input: string): string {
    return input.toUpperCase();
  }

  formatNumber(input: number): number {
    return input;
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.get('http://localhost:8080/api/authors/bill').subscribe((res: any) => {
      console.log('res all bill: ', res)
      this.data = res.data.content;
      // this.dataDetail = res.data.content.details;
    })

    this.searchModel.pageSize = 999;
    this.api.getListBill(this.searchModel).toPromise().then((data: any) => {
      // this.data = data.data;
      // this.total = data.optional;

      const totalByMonth = {};
      data.data.forEach(purchase => {
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
      console.log('newArray: ', newArray);
      console.log('dataChart: ', this.dataChart);
      this.dataChart = this.dataChart.map(item => {
        console.log('this.dataChart: ', item);
        return {
          'name': `${item.month}`,
          'value': `${item.total}`
        };
      });
      return newArray;
    });
  }


  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    if (this.formSearch.get('name').value == '') {
      this.formSearch.get('name').setValue(null);
    }
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, false);
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
      this.notificationService.showMessage('success', 'Bạn không đồng ý hoàn tiền cho khách hàng')
    })
  }

  viewDetailBill(value: any) {
    this.dataDetail = value.details;
    this.isRefuse = true;
  }

  handleCancelViewDetailBill() {
    this.isRefuse = false
  }

}
