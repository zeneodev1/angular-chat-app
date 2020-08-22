import { UserProfile } from './user-profile.model';

export class User {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public photo?: string,
    public status?: string,
    public friends?: User[],
    public profile?: UserProfile
  ) {}
}
