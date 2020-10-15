import {createSelector} from '@ngrx/store';
import {MessageState} from '../reducer/message.reducer';


export interface AppState {
  message: MessageState;
}

export const selectMessage = (state: AppState) => {
  return state.message;
};

export const selectMessageMessages = createSelector(selectMessage,
  (state: MessageState) => state.messages
);

export const selectMessageVisited = createSelector(selectMessage,
  (state: MessageState) => state.visited
);

export const selectNewMessage = createSelector(selectMessage,
  (state: MessageState) => state.newMessage
);

export const selectMessageSeen = createSelector(selectMessage,
  (state: MessageState) => state.seen
);

export const selectMessageConversationState = createSelector(selectMessage,
  (state: MessageState) => state.conversationState
);
