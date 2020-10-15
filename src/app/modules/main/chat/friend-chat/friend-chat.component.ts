import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConversationService} from '@core/services/conversation.service';
import {MessageService} from '@core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '@shared/models/conversation.model';
import {User} from '@shared/models/user.model';
import {Message} from '@shared/models/message.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {addToMessages, addToVisited, newMessage, setSeen} from '@core/store/action/message.action';
import {selectMessageConversationState, selectMessageMessages, selectMessageVisited} from '@core/store/selector/message.selector';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friend-chat',
  templateUrl: './friend-chat.component.html',
  styleUrls: ['./friend-chat.component.css']
})
export class FriendChatComponent implements OnInit, OnDestroy {

  @ViewChild('messagesDiv')
  messagesElement: ElementRef;
  conversationId: string;
  conversation: Conversation;
  messages: Message[];
  conversationMessages: Message[];
  friend: User;
  user: User;
  visited: Array<string> ;
  messagesForm: FormGroup;
  conversationLoaded: boolean;
  messagesLoaded: boolean;
  subscriptions: Subscription[];
  lastSeen: string;
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private messageStore: Store<{message}>,
              private ngxSpinnerService: NgxSpinnerService) {
    this.initVariables();
    const sub = this.activatedRoute.params.subscribe(value => {
      this.conversationId = value.conId;
      this.initialAPICalls();
      messageStore.dispatch(addToVisited({id: this.conversationId}));
    });
    this.subscriptions.push(sub);
  }


  initVariables(): void {
    this.friend = new User();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.visited = [];
    this.subscriptions = [];
    this.conversationLoaded = false;
    this.messagesLoaded = false;
    this.conversationMessages = [];
    this.messagesForm = new FormGroup(
      {
        text: new FormControl(null, Validators.required)
      }
    );
    const sub1 = this.messageStore.select(selectMessageVisited).subscribe(value => {
      if (value.length !== 0) {
        this.visited = value;
      }
    });
    const sub2 = this.messageStore.select(selectMessageMessages).subscribe(value => {
      if (value !== null || value !== []) {
        this.messages = value;
        this.conversationMessages = this.filterConversationMessages(this.messages, this.conversationId);
        this.messagesLoaded = true;
        if (this.conversationMessages.length !== 0 && this.conversationLoaded && this.conversation.lastSeenMessage !== null) {
          if (this.conversationMessages[this.conversationMessages.length - 1].id !== this.conversation.lastSeenMessage[this.user.id]) {
            if (this.lastSeen !== this.conversationMessages[this.conversationMessages.length - 1].id) {
              if (this.conversationMessages[this.conversationMessages.length - 1].from !== this.user.id) {
                this.lastSeen = this.conversationMessages[this.conversationMessages.length - 1].id;
                this.sendSeen();
              }
            }
          }
          this.slideToBottom();
        }
      }
    });
    const sub3 = this.messageStore.select(selectMessageConversationState).subscribe(value => {
      if (value !== null && value.id === this.conversationId) {
        this.conversation = value;
      }
    });
    this.subscriptions.push(sub1, sub2, sub3);
  }

  initialAPICalls(): void {
    this.getConversation();
    this.getMessages();
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription, index) => {
      this.subscriptions[index].unsubscribe();
    });
  }

  getMessages(): void {
    if (!this.visited.includes(this.conversationId)) {
      // get conversation messages
      this.messageService.getUserMessages(this.conversationId).toPromise().then(value => {
        this.messageStore.dispatch(addToMessages({messages: value}));
      });
    } else {
      this.conversationMessages = this.filterConversationMessages(this.messages, this.conversationId);
      this.messagesLoaded = true;
    }
  }

  getConversation(): void {
    // getting conversation by id
    this.conversationLoaded = false;
    this.messagesLoaded = false;
    this.conversationService.getConversationById(this.conversationId).toPromise().then(response => {
      this.conversation = response;
      if (this.conversation.participants !== null) {
        this.conversation.participants.forEach(value => {
          if (value.id !== this.user.id) {
            this.friend = value;
          }
        });
        if (this.conversation.lastSeenMessage !== null && this.conversation.lastMessage !== null) {
          if (this.conversation.lastMessage.id !== this.conversation.lastSeenMessage[this.user.id]) {
            if (this.lastSeen !== this.conversation.lastMessage.id) {
              if (this.conversation.lastMessage.from !== this.user.id) {
                this.lastSeen = this.conversationMessages[this.conversationMessages.length - 1].id;
                this.sendSeen();
              }
            }
          }
        }
        this.conversationLoaded = true;
        if (this.messagesLoaded) {
          this.slideToBottom();
        }
      }
    }, error => {
    });
  }

  sendMessage(): void {
    if (this.messagesForm.valid) {
      const message: Message = new Message();
      message.from = this.user.id;
      message.text = this.messagesForm.get('text').value;
      message.conversationId = this.conversationId;
      this.messagesForm.get('text').setValue('');
      this.messageStore.dispatch(newMessage({message}));
    }
  }

  sendSeen(): void {
    let messageId = null;
    if (this.conversationMessages !== []) {
      messageId = this.conversationMessages[this.conversationMessages.length - 1].id;
    } else {
      messageId = this.conversation.lastMessage.id;
    }
    this.messageStore.dispatch(setSeen({seen: {
        conversationId: this.conversationId,
        userId: this.user.id,
        messageId
      }}));
  }





  // for new message animation
  slideToBottom(): void {
    setTimeout(() => {
      this.scrollTo(this.messagesElement.nativeElement, this.messagesElement.nativeElement.scrollHeight, 250);
    }, 100);
  }
  scrollTo(element, to, duration): void {
    if (duration <= 0) {
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    }, 10);
  }


  // filtering conversation messages
  filterConversationMessages(messages, id): Message[] {
    return messages.filter((m: Message) => {
      if (m.conversationId === id) {
        return m;
      }
    });
  }
}
