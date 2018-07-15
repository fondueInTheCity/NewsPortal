import {ErrorDto} from './ErrorDto';

export class LoginResponseDto {
  token: string;
  errorDto: ErrorDto;
  userId: number;
  username: string;
  userRole: string;
  themeName: string;
  languageName: string;
}
