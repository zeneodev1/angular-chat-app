import { Component, OnInit } from '@angular/core';
import {ConversationService} from '@core/services/conversation.service';
import {Conversation} from '@shared/models/conversation.model';
import {User} from '@shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversations: Conversation[];
  user: User;
  constructor(private conversationService: ConversationService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    conversationService.getUserConversations(this.user.id).subscribe(resp => {
      this.conversations = resp;
    });
  }

  ngOnInit(): void {
  }

}
