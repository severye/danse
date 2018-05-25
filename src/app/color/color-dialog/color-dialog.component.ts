import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'color-dialog',
    templateUrl: 'color-dialog.component.html',
    styleUrls: ['color-dialog.component.css']
  })
export class ColorDialogComponent{
    constructor(
        public dialogRef: MatDialogRef<ColorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
      save(){
        this.dialogRef.close(this.data);
      }
    
      close() {
        this.dialogRef.close();
      }
}