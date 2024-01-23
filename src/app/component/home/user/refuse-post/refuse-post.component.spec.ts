import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusePostComponent } from './refuse-post.component';

describe('RefusePostComponent', () => {
  let component: RefusePostComponent;
  let fixture: ComponentFixture<RefusePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
