import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../services/view-services/snack-bar.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBarService: SnackBarService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401)
                    this.router.navigateByUrl("/login")
                this.snackBarService.openErrorSnackBar(error.error)
                return throwError(error);
            })
        )
    }
}