import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovedInformationComponent } from './removed-information.component';

describe('RemovedInformationComponent', () => {
  let component: RemovedInformationComponent;
  let fixture: ComponentFixture<RemovedInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovedInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovedInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
