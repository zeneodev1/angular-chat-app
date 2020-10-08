import {Invitation} from '../../../shared/models/invitation.model';
import {createReducer, on} from '@ngrx/store';
import {addInvitations, removeInvitation, updateInvitation} from '../action/invitation.action';


export class InvitationState {
  invitations: Invitation[];
  loaded: boolean;
}

const INITIAL_STATE: InvitationState = {
  invitations: [], loaded: false
};

const INVITATION_REDUCER = createReducer(INITIAL_STATE,
  on(addInvitations, (state, {inv, from}) => {
    state.invitations.forEach((invitation, index) => {
      inv.forEach((inv1, index1) => {
        if (invitation.id === inv1.id) {
          inv.splice(index1, 1);
        }
      });
    });
    if (from === 'ws') {
      return {...state, invitations: inv};
    }
    return {...state, loaded: true, invitations: inv};
  }),
  on(removeInvitation, (state, {id}) => {
    const inv: Invitation[] = [];
    state.invitations.forEach((invitation) => {
      if (invitation.id !== id) {
        inv.push(invitation);
      }
    });
    console.log(inv);
    return {...state, loaded: true, invitations: inv};
  }),
  on(updateInvitation, (state, {inv}) => {
    const invitations: Invitation[] = state.invitations;
    invitations.forEach((invitation, index) => {
      if (invitation.id === inv.id) {
        invitations[index] = inv;
        return;
      }
    });
    return {...state, loaded: true, invitations};
  })
);

export const invitationReducer = (state, action): any => {
  return INVITATION_REDUCER(state, action);
};
