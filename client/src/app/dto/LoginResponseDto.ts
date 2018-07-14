import {ErrorDto} from './ErrorDto';

export class LoginResponseDto {
  token: string;
  errorDto: ErrorDto;
}
