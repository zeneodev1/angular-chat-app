import {createAction, props} from '@ngrx/store';
import {Invitation} from '../../../shared/models/invitation.model';


export const addInvitations = createAction('[Invitation] add Invitations', props<{inv: Invitation[], from?: string}>());
export const removeInvitation = createAction('[Invitation] remove Invitation', props<{id: string}>());
export const updateInvitation = createAction('[Invitation] update Invitation', props<{inv: Invitation}>());
