import { User } from './user.model';

export class Invitation {
  constructor(
    public id?: string,
    public status?: string,
    public from?: User,
    public to?: User
  ) {}
}
