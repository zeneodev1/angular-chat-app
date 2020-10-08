
export class User {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public photo?: string,
    public status?: string,
    public location?: string,
    public friends?: User[],
    public gender?: string,
    public phone?: string,
    public birthay?: Date
  ) {}
}
