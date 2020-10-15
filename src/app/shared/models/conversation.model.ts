import { Message } from './message.model';
import { User } from './user.model';

export class Conversation {
  constructor(
    public id?: string,
    public type?: string,
    public participants?: User[],
    public lastMessage?: Message,
    public unseenMessages?: Map<string, number>,
    public lastSeenMessage?: Map<string, string>
  ) {}
}
