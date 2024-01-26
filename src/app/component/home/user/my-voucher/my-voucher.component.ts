import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Voucher } from 'src/app/component/admin/table-voucher/interface/voucher';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrls: ['./my-voucher.component.scss']
})
export class MyVoucherComponent implements OnInit,OnDestroy {
  
  currPage: number = 1;
  totalEle: number = 0;
  vouchers : Voucher[] = [];
  suggestedVoucher : Voucher[] =[];
  savedVoucher: string[] = [];
  userId : any;
  constructor(
    private shareDataService:ShareDataService,
    private storage:TokenStorageService,
    private api:Api,
  ) {
    
  }
  ngOnDestroy(): void {
    this.shareDataService.setActivedNav('');
  }

  ngOnInit(): void {
    this.userId = this.storage.getUser().id;
    this.shareDataService.setActivedNav('voucher');

    this.getMyVoucher();
    this.getNotMyVoucher();
      
  }
  getMyVoucher(){
    this.api.getMyVoucher(this.currPage-1,12,this.storage.getUser().id).subscribe({
      next: res =>{
        this.vouchers = res.data.content;
        this.totalEle = res.data.totalElements;
      }
    }) 
  }

  getNotMyVoucher(){
    this.api.getAllVoucherExpectUserOwn(0,5,this.storage.getUser().id).subscribe({
      next: res =>{
        this.suggestedVoucher = res.data.content;
      }
    })  
  }

  saveVoucher(voucherId:string){
    this.api.addVoucherToUse(voucherId,this.userId).subscribe({
      next: res =>{
        this.getMyVoucher();
        this.savedVoucher = [...this.savedVoucher,voucherId];
        if(this.savedVoucher.length == 5){
          this.api.getAllVoucherExpectUserOwn(0,5,this.storage.getUser().id).subscribe({
            next: res =>{
              this.suggestedVoucher = res.data.content;
              this.savedVoucher =[];
            }
          })
        }
      }
    })
  }
  exist(voucherId:any):boolean{
    return this.savedVoucher.filter(v => v == voucherId).length > 0;
  }
}
