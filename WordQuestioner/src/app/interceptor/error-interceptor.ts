import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../services/view-services/snack-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBarService: SnackBarService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.snackBarService.openErrorSnackBar(error.message)
                return throwError(error);
            })
        )
    }

}