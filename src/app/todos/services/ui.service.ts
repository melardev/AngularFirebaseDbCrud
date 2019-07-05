import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastr: ToastrService) {

  }

  showToastSuccess(message) {

    // this.toastr.success(message);
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000
    });
  }

  showToastError(message) {
    this.toastr.error(message);
  }

}
