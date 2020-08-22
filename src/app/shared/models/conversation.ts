import { Message } from './message';
import { User } from './user';

export class Conversation {
  constructor(
    public id?: string,
    public type?: string,
    public participants?: User[],
    public lastMessage?: Message
  ) {}
}
