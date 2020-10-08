import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsNotificationComponent } from './invitations-notification.component';

describe('InvitationsNotificationComponent', () => {
  let component: InvitationsNotificationComponent;
  let fixture: ComponentFixture<InvitationsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationsNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
