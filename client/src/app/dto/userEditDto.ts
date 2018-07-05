import {Theme} from "../models/theme";
import {Language} from "../models/language";
export class UserEditDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  role: string
  city: string;
  bio: string;
  avatar: FormData;
  theme: Theme;
  language: Language;
}
