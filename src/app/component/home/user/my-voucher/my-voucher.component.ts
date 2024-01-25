import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrls: ['./my-voucher.component.scss']
})
export class MyVoucherComponent implements OnInit,OnDestroy {
  
  vouchers : any[] = [];
  suggestedVoucher : any[] =[];
  constructor(
    private shareDataService:ShareDataService
  ) {
    
  }
  ngOnDestroy(): void {
    this.shareDataService.setActivedNav('');
  }

  ngOnInit(): void {
    this.vouchers = Array(10).fill(1);
    this.suggestedVoucher = Array(4).fill(1);
    this.shareDataService.setActivedNav('voucher');
  }
}
