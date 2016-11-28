import {MdDialogRef} from "@angular/material";
import {Component} from "@angular/core";

@Component({
    styleUrls: ['./dialog.component.less'],
    selector: 'errorDialog',
    template: `
<p>{{error}}</p>
    <button md-raised-button type="button" class="confirm" color="primary" (click)="dialogRef.close('ok')">Ok</button>
  `
})
export class ErrorDialog {
    error: String;

    constructor(public dialogRef: MdDialogRef<ErrorDialog>) {
    }
}