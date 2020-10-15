import {Message} from '../../../shared/models/message.model';
import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {addToMessages, addToVisited, newMessage, setConversationState, setSeen} from '../action/message.action';
import { Conversation } from '@shared/models/conversation.model';


export class MessageState {
  visited: string[];
  messages: Message[];
  newMessage: Message;
  seen: any;
  conversationState: Conversation;
}

const INITIAL_STATE: MessageState = {
  visited: [],
  messages: [],
  newMessage: null,
  seen: null,
  conversationState: null
};

const MESSAGE_REDUCER: ActionReducer<any, Action> = createReducer(INITIAL_STATE,
  on(addToMessages, (messageState, {messages}) => {
    return {...messageState, messages: [...messageState.messages, ...messages]};
  }),
  on(addToVisited, (messageState, {id}) => {
    if (!messageState.visited.includes(id)) {
      return {...messageState, visited: [...messageState.visited, id]};
    } else {
      return messageState;
    }
  }),
  on(newMessage, (messageState, {message}) => {
    if (message !== null) {
      return {...messageState, newMessage: message};
    } else {
      return messageState;
    }
  }),
  on(setSeen, (messageState, {seen}) => {
    if (seen !== null) {
      return {...messageState, seen};
    } else {
      return messageState;
    }
  }),
  on(setConversationState, (messageState, {conversation}) => {
    if (conversation !== null) {
      return {...messageState, conversationState: conversation};
    } else {
      return messageState;
    }
  })
);

export function messageReducer(state, action): any {
  return MESSAGE_REDUCER(state, action);
}
