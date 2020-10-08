import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitaionDialogComponent } from './invitaion-dialog.component';

describe('InvitaionDialogComponent', () => {
  let component: InvitaionDialogComponent;
  let fixture: ComponentFixture<InvitaionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitaionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitaionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
