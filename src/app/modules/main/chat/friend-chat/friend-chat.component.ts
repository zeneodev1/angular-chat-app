import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConversationService} from '@core/services/conversation.service';
import {MessageService} from '@core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '@shared/models/conversation.model';
import {User} from '@shared/models/user.model';
import {Message} from '@shared/models/message.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {element} from 'protractor';
import {Store} from '@ngrx/store';
import {addToMessages, addToVisited, newMessage} from '@core/store/action/message.action';
import {selectMessageMessages, selectMessageVisited} from '@core/store/selector/message.selector';
import {NgxSpinner} from 'ngx-spinner/lib/ngx-spinner.enum';
import {NgxSpinnerService} from 'ngx-spinner';

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
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private messageStore: Store<{message}>,
              private ngxSpinnerService: NgxSpinnerService) {
    this.initVariables();
    this.activatedRoute.params.subscribe(value => {
      this.conversationId = value.conId;
      this.initialAPICalls();
      messageStore.dispatch(addToVisited({id: this.conversationId}));
    });
  }

  ngOnDestroy(): void {
  }

  initVariables(): void {
    this.friend = new User();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.visited = [];
    this.conversationLoaded = false;
    this.conversationMessages = [];
    this.messagesForm = new FormGroup(
      {
        text: new FormControl(null, Validators.required)
      }
    );
    this.messageStore.select(selectMessageVisited).subscribe(value => {
      if (value.length !== 0) {
        this.visited = value;
      }
    });
    this.messageStore.select(selectMessageMessages).subscribe(value => {
      if (value !== null || value !== []) {
        this.messages = value;
        this.conversationMessages = this.filterConversationMessages(this.messages, this.conversationId);
        this.slideToBottom();
      }
    });
  }

  initialAPICalls(): void {
    // getting conversation by id
    this.conversationLoaded = false;
    this.conversationService.getConversationById(this.conversationId).subscribe(response => {
      this.conversation = response;
      if (this.conversation.participants !== null) {
        this.conversation.participants.forEach(value => {
          if (value.id !== this.user.id) {
            this.friend = value;
          }
        });
        this.conversationLoaded = true;
      }
    }, error => {
    });
    if (!this.visited.includes(this.conversationId)) {
      this.messageService.getUserMessages(this.conversationId).toPromise().then(value => {
        this.messageStore.dispatch(addToMessages({messages: value}));
      });
    } else {
      this.slideToBottom();
      this.conversationMessages = this.filterConversationMessages(this.messages, this.conversationId);
    }
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
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





  // for new message animation
  slideToBottom(): void {
    setTimeout(() => {
      this.scrollTo(this.messagesElement.nativeElement, this.messagesElement.nativeElement.scrollHeight, 250);
    }, 100);
  }
  // tslint:disable-next-line:no-shadowed-variable
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


  filterConversationMessages(messages, id): Message[] {
    return messages.filter((m: Message) => {
      if (m.conversationId === id) {
        return m;
      }
    });
  }
}
