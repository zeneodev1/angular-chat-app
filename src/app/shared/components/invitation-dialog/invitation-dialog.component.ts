import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InvitationService} from '@core/services/invitation.service';
import {User} from '@shared/models/user.model';
import {Invitation} from '@shared/models/invitation.model';
import {UserService} from '@core/services/user.service';

enum Status {
  PENDING,
  ACCEPTED,
  SENT_TO_YOU
}

class PersonStatus {
  constructor(public status?: Status, public person?: User) {
  }
}

@Component({
  selector: 'app-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.css']
})
export class InvitationDialogComponent implements OnInit {

  user: User;

  @Output()
  cancel: EventEmitter<void>;
  invitations: Invitation[];
  typingTimeOut: any;
  peopleStatus: PersonStatus[];
  status = Status;
  constructor(private invitationService: InvitationService,
              private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.cancel = new EventEmitter<void>();
    this.invitations = [];
    invitationService.getAllInvitations(this.user.id).toPromise().then(value => {
      this.invitations = value;
    }).catch(reason => {
    });
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.cancel.emit();
  }

  searchForPeople($event): void {
    clearTimeout(this.typingTimeOut);
    this.typingTimeOut = setTimeout(() => {
      if ($event.target.value !== '') {
        this.userService.searchForPeople($event.target.value.toLowerCase()).subscribe(value => {
          value = value.filter(user => {
            return user.id !== this.user.id;
          });
          this.peopleToPeopleStatus(value);
        });
      }
    }, 1000);
  }

  peopleToPeopleStatus(people: User[]): void {
    this.peopleStatus = [];
    people.forEach(value => {
      const personStatus = new PersonStatus();
      personStatus.person = value;
      this.invitations.forEach(value1 => {
        if (value1.to.id === value.id || value1.from.id === value.id) {
          if (value1.status === 'PENDING' && value1.from.id === this.user.id) {
            personStatus.status = Status.PENDING;
          } else if (value1.status === 'ACCEPTED') {
            personStatus.status = Status.ACCEPTED;
          } else if (value1.status === 'PENDING' && value1.to.id === this.user.id) {
            personStatus.status = Status.SENT_TO_YOU;
          }
        }
      });
      this.peopleStatus.push(personStatus);
    });
  }

  inviteFriend(personId): void {
    let m = 0;
    this.invitationService.sendInvitation(this.user.id, personId).toPromise().then(resp => {
      this.peopleStatus.map(value => {
        if (m === 0) {
          if (value.person.id === personId) {
            value.status = Status.PENDING;
            m = 1;
            return value;
          }
        }
      });
    });
  }

  acceptInvitation(id: string): void {
    this.invitationService.acceptInvitation(this.user.id, id).toPromise().then(value => {
      this.cancel.emit();
    });
  }
}
