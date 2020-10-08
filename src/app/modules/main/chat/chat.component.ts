import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ConversationService} from '@core/services/conversation.service';
import {Conversation} from '@shared/models/conversation.model';
import {User} from '@shared/models/user.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public conversations: Conversation[];
  user: User;
  inConversation: boolean;
  @ViewChild('mySpinner')
  spinnerEl: ElementRef;
  isSmallScreen: any;
  constructor(private conversationService: ConversationService,
              private zone: NgZone,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.initVariables();
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/') {
          this.inConversation = false;
          this.redirectToConversation();
        } else if (event.url.startsWith('/chat/')) {
          this.inConversation = true;
        }
      }
    });
    conversationService.getUserConversations(this.user.id).subscribe(value => {
      this.conversations = value;
      this.redirectToConversation();
    });
    conversationService.listenToUserConversations(this.user.id).subscribe(value => {
      this.zone.run(args => {
        switch (value.eventType) {
          case 'update':
            this.updateConversation(value.document);
            this.insertConversation(value.document);
            break;
          case 'insert':
            this.insertConversation(value.document);
            break;
          case 'delete':
            this.deleteConversation(value.document);
            break;
        }
      });
    });
  }

  initVariables(): void {
    this.isSmallScreen = window.innerWidth <= 768;
    this.inConversation = false;
    if (this.activatedRoute.snapshot.firstChild !== null) {
      this.inConversation = true;
    }
    console.log(this.inConversation);
    this.conversations = [];
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  redirectToConversation(): void {
    if (this.inConversation === false && this.conversations.length > 0 && !this.isSmallScreen) {
      this.router.navigateByUrl('/chat/' + this.conversations[0].id);
    }
  }

  ngOnInit(): void {
  }

  updateConversation(conversation: Conversation): void {
    this.deleteConversation(conversation);
  }

  insertConversation(conversation: Conversation): void {
    this.conversations.unshift(conversation);
  }

  deleteConversation(conversation: Conversation): void {
    this.conversations.forEach((con, index) => {
      if (conversation.id === con.id) {
        this.conversations.splice(index, 1);
        return;
      }
    });
  }

}
