import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from './error.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class InfoService {
  constructor(private toastr: ToastrService,
              private errorService: ErrorService,
              private translate: TranslateService) {}

  alertInformation(error: string, message: string) {
    this.translate.get(message).subscribe((data) => {
    switch (error) {
      case this.errorService.INFO: {
          this.toastr.info(data);
        break;
      }
      case this.errorService.SUCCESS: {
        this.toastr.success(data);
        break;
      }
      case this.errorService.WARNING: {
        this.toastr.warning(data);
        break;
      }
      case this.errorService.ERROR: {
        this.toastr.error(data);
        break;
      }
    }
  });
  }
}
