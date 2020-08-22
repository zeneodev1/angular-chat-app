import { User } from './user.model';
import { MessageStatus } from './message-status.model';

export class Message {
  constructor(
    public id?: string,
    public text?: string,
    public sentAt?: Date,
    public status?: string,
    public from?: User,
    public conversationId?: string,
    public messageStatuses?: MessageStatus[]
  ) {}
}
