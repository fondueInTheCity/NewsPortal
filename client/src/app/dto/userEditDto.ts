import {Theme, Language} from '../model';
export class UserEditDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  role: string;
  city: string;
  bio: string;
  avatar: FormData;
  theme: Theme;
  language: Language;
}
