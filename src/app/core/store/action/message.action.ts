import {createAction, props} from '@ngrx/store';
import {Message} from '@shared/models/message.model';


export const addToVisited = createAction('[message] Add to visited', props<{id: string}>());
export const addToMessages = createAction('[message] Add to messages', props<{messages: Message[]}>());
export const newMessage = createAction('[message] Add new message', props<{message: Message}>());
