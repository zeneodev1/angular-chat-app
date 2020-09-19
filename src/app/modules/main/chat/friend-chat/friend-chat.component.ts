import { Component, OnInit } from '@angular/core';
import {ConversationService} from '@core/services/conversation.service';
import {MessageService} from '@core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '@shared/models/conversation.model';
import {User} from '@shared/models/user.model';

@Component({
  selector: 'app-friend-chat',
  templateUrl: './friend-chat.component.html',
  styleUrls: ['./friend-chat.component.css']
})
export class FriendChatComponent implements OnInit {

  private conversationId: string;
  conversation: Conversation;
  friend: User;
  user: User;
  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) {
    this.initVariables();
    this.initialAPICalls();
  }

  initVariables(): void {
    this.friend = new User();
    this.conversationId = this.activatedRoute.snapshot.paramMap.get('conId');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  initialAPICalls(): void {
    // getting conversation by id
    this.conversationService.getConversationById(this.conversationId).subscribe(response => {
      this.conversation = response;
      this.conversation.participants.forEach(value => {
        if (value.id !== this.user.id) {
          this.friend = value;
        }
      });
    }, error => {
    });
    // connect to the websocket
    this.messageService.connect(() => {
      // subscribe in messages broker
      this.messageService.watchMessages(this.conversationId, message => {
        console.log(message);
      });
    });
  }

  ngOnInit(): void {
  }

}
