import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessagesService {

  constructor(public snackBar: MatSnackBar) { }

  log(message: string) {
    setTimeout(() => this.snackBar.open(message, '', {duration: 3000}));
  }

}
