import {Component, OnDestroy, OnInit, HostListener, ElementRef, ViewChild} from '@angular/core';
import {UserService} from '@core/services/user.service';
import {Router} from '@angular/router';
import {WebsocketService} from '@core/services/websocket.service';
import {Store} from '@ngrx/store';
import {MessageState} from '@core/store/reducer/message.reducer';
import {addToMessages, addToVisited, setConversationState} from '@core/store/action/message.action';
import {selectMessageMessages, selectMessageSeen, selectMessageVisited, selectNewMessage} from '@core/store/selector/message.selector';
import {distinctUntilChanged} from 'rxjs/operators';
import {User} from '@shared/models/user.model';
import {addInvitations} from '@core/store/action/invitation.action';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  profileCollapsed: boolean;
  invitationDialogDisplayed: boolean;
  websocketService: WebsocketService;
  wsConnected: boolean;
  notificationCollapsed: boolean;
  user: User;
  @ViewChild('mySpinner')
  spinnerEl: ElementRef;
  subscriptions: Subscription[];
  constructor(private userService: UserService,
              private router: Router,
              private store: Store<{message, invitations}>) {
    this.initVariables();
    this.websocketService.connect(() => {
      this.wsConnected = true;
      this.websocketService.subscribe('/topic/invitations/' + this.user.id,
        message => {
          this.store.dispatch(addInvitations({inv: [JSON.parse(message.body)], from: 'ws'}));
        });
    }, () => {
      this.wsConnected = false;
    });
    this.handleMessageStore();
  }

  initVariables(): void {
    this.subscriptions = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.invitationDialogDisplayed = false;
    this.profileCollapsed = true;
    this.websocketService = new WebsocketService();
    this.wsConnected = false;
    this.notificationCollapsed = true;
  }

  handleMessageStore(): void {
    const sub1 = this.store.select(selectNewMessage).subscribe(value => {
      if (value !== null) {
        this.websocketService.sendMessage('/app/messages/' + value.conversationId, value);
      }
    });
    const sub2 = this.store.select(selectMessageSeen).subscribe(value => {
      if (value !== null) {
        this.websocketService.sendMessage('/app/messages/' + value.conversationId + '/seen', value);
      }
    });
    const sub3 = this.store.select(selectMessageVisited).subscribe(value => {
      if (value.length !== 0) {
        this.websocketService.subscribe('/topic/messages/' + value[value.length - 1],
          message => {
            this.store.dispatch(addToMessages({messages: [JSON.parse(message.body)]}));
          });
        this.websocketService.subscribe('/topic/messages/' + value[value.length - 1] + '/seen',
          message => {
            this.store.dispatch(setConversationState({conversation: JSON.parse(message.body)}));
          });
      }
    });
    this.subscriptions.push(sub1, sub2, sub3);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['auth/login']);
  }

  showHideInvitationDialog(): void {
    this.invitationDialogDisplayed = !this.invitationDialogDisplayed;
  }

  expandCollapseProfile(): void {
    this.profileCollapsed = !this.profileCollapsed;
  }

  expandCollapseNotifications(): void {
    this.notificationCollapsed = !this.notificationCollapsed;
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.subscriptions.forEach((subscription, index) => {
      this.subscriptions[index].unsubscribe();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.notificationCollapsed = true;
    this.profileCollapsed = true;
  }
}
