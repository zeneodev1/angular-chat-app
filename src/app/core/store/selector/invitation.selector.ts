import {InvitationState} from '../reducer/invitation.reducer';
import {createSelector} from '@ngrx/store';

export class AppState{
  invitation: InvitationState;
}

export const selectInvitation = (state: AppState) => {
  return state.invitation;
};

export const selectInvitationInvitations = createSelector(selectInvitation, s1 => {
  return s1.invitations;
});

export const selectInvitationLoaded = createSelector(selectInvitation, s1 => {
  return s1.loaded;
});
