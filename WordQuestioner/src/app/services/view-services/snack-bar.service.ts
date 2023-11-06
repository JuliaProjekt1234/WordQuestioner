import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
const verticalPosition: MatSnackBarVerticalPosition = 'top';
const duration = 2000;
@Injectable({
    providedIn: 'root',
})

export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar,
    ) { }

    public openSnackBar(message: string): void {
        this.snackBar.open(message, 'close',
            {
                duration: duration,
                horizontalPosition: horizontalPosition,
                verticalPosition: verticalPosition,
                panelClass: "snack-bar"
            })
    }

    public openErrorSnackBar(message: string): void {
        this.snackBar.open(message, 'close',
            {
                duration: duration,
                horizontalPosition: horizontalPosition,
                verticalPosition: verticalPosition,
                panelClass: "error-snack-bar"
            })
    }
}