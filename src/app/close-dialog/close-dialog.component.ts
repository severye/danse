import { Component, OnInit, Inject } from '@angular/core';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.css']
})
export class CloseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ObjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  delete(){
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }

}
