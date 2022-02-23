import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppResolver } from '@core/app.resolver';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private appResolver: AppResolver) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      let errorMsg: string;
      switch (error.status) {
        case 502:
          errorMsg = 'Account pending activation. Please try again later.';
          this.snackbar.open(errorMsg, 'close');
          break;
        case 503:
          errorMsg = 'Maintenance mode.';
          this.router.navigateByUrl('/maintenance-mode');
          break;
        case 402:
          errorMsg = 'Account suspended.';
          this.router.navigateByUrl('/suspended');
          break;
        case 403:
        case 419:
          errorMsg = 'This action is not authorized. Sorry.';
          this.snackbar.open(errorMsg, 'close');
          break;
        case 422:
          errorMsg = 'The given data was invalid.';
          for (let key of Object.keys(error.error.errors)) {
            errorMsg = error.error.errors[key];
          }
          this.snackbar.open(errorMsg, 'close');
          break;
        case 423:
          errorMsg = error;
          break;
        default:
          errorMsg = error.error.message;
          this.snackbar.open(errorMsg, 'close');
      }

      return throwError(errorMsg);
    }));
  }
}
