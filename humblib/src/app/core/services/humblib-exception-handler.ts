import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface HumblibException {
  statusCode: string;
  info?: string;
  detail: string;
  path: string;
}

@Injectable()
export class HumblibExceptionHandler implements ErrorHandler {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {}
  exceptionMap = {
    '2101': 'Book not found',
    '2201': 'Category not found',
    '2202': 'Top Category not found',
    '2301': 'Note not found',
    '2401': 'Library not found',
    '2501': 'Internal library error',
    '1001': 'Invalid Credentials',
    '1101': 'Email already in use',
    '1102': 'Username in use',
    '1201': 'User not found',
  };
  handleError(error: any) {
    const message =
      this.exceptionMap[
        error.error.statusCode as keyof typeof this.exceptionMap
      ];
    this.zone.run(() => this._snackBar.open(message));
  }
}
