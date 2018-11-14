import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopChartsComponent } from './top-charts.component';

describe('TopChartsComponent', () => {
  let component: TopChartsComponent;
  let fixture: ComponentFixture<TopChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
