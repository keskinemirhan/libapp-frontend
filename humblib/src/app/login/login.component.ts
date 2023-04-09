import { Component } from '@angular/core';
import { LoggerService, status } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { Login } from '../core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';

let dialogShow = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public loggerService: LoggerService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.loggerService.serverResponse.getValue(),
    });
  }

  onSubmit() {
    const credentials: Login = {
      email: this.form.value.username,
      password: this.form.value.password,
    };
    this.loggerService.login(credentials);
    this.loggerService.logStatus.asObservable().subscribe((data: number) => {
      if (!dialogShow) {
        switch (data) {
          case status.EMPTY:
            break;
          case status.DONE:
            dialogShow = true;
            this.router.navigateByUrl('/');
            break;
          case status.FAILED:
            dialogShow = true;
            this.openDialog();
            break;
        }
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  //temporary error catch
  template: `<p>{{ data.error.detail }}</p>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
    </div>`,
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.data = JSON.stringify(data);
  }

  onNoClick(): void {
    dialogShow = false;
    this.dialogRef.close();
  }
}
