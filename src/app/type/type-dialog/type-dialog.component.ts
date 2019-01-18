import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SuperTypeService } from "../../supertype/supertype.service";
import { ObjectDanse } from "../../shared/objectDanse";

@Component({
    selector: 'type-dialog',
    templateUrl: 'type-dialog.component.html',
    styleUrls: ['type-dialog.component.css']
  })
export class TypeDialogComponent implements OnInit{
  superTypes:Array<ObjectDanse>=[];
    constructor(
        public dialogRef: MatDialogRef<TypeDialogComponent>,public superTypeService: SuperTypeService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
      ngOnInit(){
      
        this.superTypeService.getAllSuperTypes().subscribe((result:any) => { 
          this.superTypes=result.data;
        },err => console.error(err));
      }  
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