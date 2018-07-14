import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class InfoService {
  constructor(private toastr: ToastrService) {
  }

  alertInformation(error: string, message: string) {
    switch (error) {
      case 'info': {
        this.toastr.info(message);
        break;
      }
      case 'success': {
        this.toastr.success(message);
        break;
      }
      case 'warning': {
        this.toastr.warning(message);
        break;
      }
      case 'error': {
        this.toastr.error(message);
        break;
      }
    }
  }
}
