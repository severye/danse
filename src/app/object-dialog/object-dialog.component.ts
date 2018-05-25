import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";



@Component({
    selector: 'object-dialog',
    templateUrl: 'object-dialog.component.html',
  })
export class ObjectDialogComponent{

    constructor(
      public dialogRef: MatDialogRef<ObjectDialogComponent>,
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