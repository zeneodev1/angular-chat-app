import {createAction, props} from '@ngrx/store';
import {Message} from '@shared/models/message.model';
import {Conversation} from '@shared/models/conversation.model';


export const addToVisited = createAction('[message] Add to visited', props<{id: string}>());
export const addToMessages = createAction('[message] Add to messages', props<{messages: Message[]}>());
export const newMessage = createAction('[message] Add new message', props<{message: Message}>());
export const setSeen = createAction('[message] Set seen', props<{seen: any}>());
export const setConversationState = createAction('[message] Set conversation state', props<{conversation: Conversation}>());
