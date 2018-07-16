import {Injectable} from '@angular/core';


@Injectable()
export class ErrorService {
  constructor() {}

  public USERNAME = 'Username';
  public YOU_ARE_CHANGE = 'You are changed';
  public FIRST_NAME = 'First Name';
  public LAST_NAME = 'Last Name';
  public COUNTRY = 'Country';
  public CITY = 'City';
  public BIO = 'Bio';
  public REGISTRATION = 'REGISTRATION';
  public TITLE = 'Title';
  public DESCRIPTION = 'Description';
  public

  public ERROR = 'error';
  public INVALID = 'Invalid';
  public EMPTY = 'Empty';
  public IS_NOT_UNIQUE = 'is not unique';
  public INVALID_USERNAME = this.INVALID + ' ' + this.USERNAME;
  public INVALID_FIRST_NAME = this.INVALID + ' '  + this.FIRST_NAME;
  public INVALID_LAST_NAME = this.INVALID + ' '  + this.LAST_NAME;
  public INVALID_COUNTRY = this.INVALID + ' '  + this.COUNTRY;
  public INVALID_CITY = this.INVALID + ' '  + this.CITY;
  public INVALID_BIO = this.INVALID + ' '  + this.BIO;
  public INVALID_TITLE = this.INVALID + ' ' + this.TITLE;
  public INVALID_DESCRIPTION = this.INVALID + ' ' + this.DESCRIPTION;
  public USERNAME_IS_NOT_UNIQUE = this.USERNAME + ' ' + this.IS_NOT_UNIQUE;
  public IS_NULL_CATEGORIES = 'News has not category';
  public IS_NULL_CONTENT = 'Content is empty';

  public SUCCESS = 'success';
  public SUCCESS_CHANGE_USERNAME = this.YOU_ARE_CHANGE + ' '  + this.USERNAME;
  public SUCCESS_CHANGE_FIRST_NAME = this.YOU_ARE_CHANGE + ' '  + this.FIRST_NAME;
  public SUCCESS_CHANGE_LAST_NAME = this.YOU_ARE_CHANGE + ' '  + this.LAST_NAME;
  public SUCCESS_CHANGE_COUNTRY = this.YOU_ARE_CHANGE + ' '  + this.COUNTRY;
  public SUCCESS_CHANGE_CITY = this.YOU_ARE_CHANGE + ' '  + this.CITY;
  public SUCCESS_CHANGE_BIO = this.YOU_ARE_CHANGE + ' '  + this.BIO;
  public SUCCESS_REGISTRATION = this.SUCCESS + ' '  + this.REGISTRATION;

  public WARNING = 'warning';

  public INFO = 'info';
}
