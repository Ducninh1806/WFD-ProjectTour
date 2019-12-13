import {ITour} from './i-tour';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  tourSet: ITour;
}
