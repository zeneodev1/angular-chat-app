import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Invitation} from '@shared/models/invitation.model';
import {InvitationService} from '@core/services/invitation.service';
import {Store} from '@ngrx/store';
import {InvitationState} from '@core/store/reducer/invitation.reducer';
import {User} from '@shared/models/user.model';
import {addInvitations, removeInvitation} from '@core/store/action/invitation.action';
import {selectInvitation, selectInvitationInvitations, selectInvitationLoaded} from '@core/store/selector/invitation.selector';


@Component({
  selector: 'app-invitations-notification',
  templateUrl: './invitations-notification.component.html',
  styleUrls: ['./invitations-notification.component.css']
})
export class InvitationsNotificationComponent implements OnInit {

  invitations: Invitation[];
  user: User;
  loading: boolean;
  @Output()
  cancel: EventEmitter<void>;
  constructor(private invitationService: InvitationService,
              private store: Store<{invitation: InvitationState}>) {
    this.invitations = [];
    this.loading = true;
    this.cancel = new EventEmitter();
    this.user = JSON.parse(localStorage.getItem('user'));

    store.select(selectInvitationInvitations).subscribe(inv => {
      this.invitations = inv;
    });
    store.select(selectInvitationLoaded).subscribe(value => {
      if (!value) {
        invitationService.getAllImportantInvitations(this.user.id).toPromise().then(invits => {
          store.dispatch(addInvitations({inv: invits}));
        });
      }
      this.loading = !value;
    });
  }

  acceptInvitation(invitation: Invitation): void {
    this.invitationService.acceptInvitation(invitation.to.id, invitation.from.id).subscribe(value => {
      this.store.dispatch(removeInvitation({id: invitation.id}));
      this.cancel.emit();
    });
  }

  ngOnInit(): void {
  }

}
