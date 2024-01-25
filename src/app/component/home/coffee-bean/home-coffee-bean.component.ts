import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ShareDataService} from '../../../services/share-data.service';
import {Api} from '../../../services/api';

@Component({
  selector: 'app-home-coffee-bean',
  templateUrl: './home-coffee-bean.component.html',
  styleUrls: ['./home-coffee-bean.component.scss'],
})
export class HomeCoffeeBeanComponent implements OnInit {
  @Input() searchValue: any;

  data: any[];
  searchInput: string;

  formSearch: FormGroup;
  searchModel: SearchModelEntity = new SearchModelEntity();
  total: number;

  cofeeBeanId: any;
  curPage: number;


  receivedData = '';
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private shareDataService: ShareDataService,
    private api: Api,

  ) {
    this.formSearch = this.fb.group({
      name: null,
    });
    this.search();
    // this.subscription = this.shareDataService.dataSearch$.subscribe((data) => {
    //   this.receivedData = data;
    //   if (this.receivedData) {
    //     this.search(this.receivedData);
    //     console.log('2');
    //   }
    //   if (!this.receivedData) {
    //     this.search(null);
    //     console.log('1');
    //   }
    // });
  }


  ngOnInit(): void {
  }

  updatecofeeBeanId(item: any) {

    localStorage.setItem('cofeeBeanId', item.id);
    localStorage.setItem('postsCategory', 'Cà phê');

    this.shareDataService.sendDataCategory('Cà phê');
    this.router.navigate(['/home/detail/coffee-bean', item.name]);
  }

  update(searchModel: SearchModelEntity, reset: boolean) {
    this.api.getListCoffee(this.searchModel).subscribe((data: any) => {
      // this.data.next([...data.data]);
      this.data = data.data;
      this.total = data.optional;
      // this.cdr.detectChanges();
    });
  }

  search(value?: any) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 12;
    this.update(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 12;
    this.update(this.searchModel, false);
  }

  handleSearchInput() {
    if (this.searchInput != null) {
      this.formSearch.get('name').setValue(this.searchInput);
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    }
    if (this.searchInput == '') {
      this.formSearch.get('name').setValue(null);
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    }
    this.api.getListCoffee(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }


}
