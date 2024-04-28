export interface IUser {
  _id: string;
  name: string;
  friends: IUser[];
}
