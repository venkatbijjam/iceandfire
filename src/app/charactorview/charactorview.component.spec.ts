import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactorviewComponent } from './charactorview.component';

describe('CharactorviewComponent', () => {
  let component: CharactorviewComponent;
  let fixture: ComponentFixture<CharactorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactorviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
