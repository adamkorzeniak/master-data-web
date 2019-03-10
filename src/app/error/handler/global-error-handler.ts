
import { ErrorHandler, Injectable, Injector, ApplicationRef, NgZone} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorsService } from '../service/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor( private injector: Injector ) {}

  public handleError(error: Error | HttpErrorResponse) {
    const errorsService = this.injector.get(ErrorsService);
    const router = this.injector.get(Router);
    const zone = this.injector.get(NgZone);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return alert('No Internet Connection');
      }
      errorsService.log(error).subscribe();
      return alert(`${error.status} - ${error.message}`);
    } else {
      errorsService
        .log(error)
        .subscribe(errorWithContextInfo => {
          zone.run(() => {
              router.navigate(['/error'], { queryParams: errorWithContextInfo });
          });
        });
    }
  }
}

