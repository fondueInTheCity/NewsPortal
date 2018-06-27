import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewsComponent } from './profile-news.component';

describe('ProfileNewsComponent', () => {
  let component: ProfileNewsComponent;
  let fixture: ComponentFixture<ProfileNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
