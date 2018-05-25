import { Component, OnInit, Inject } from '@angular/core';
import { BoxService } from './box.service';
import { ObjectDanse } from '../shared/objectDanse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
@Component({
  selector: 'app-box',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  box:ObjectDanse;
  title:string;
  noneObject:string;
  constructor(private boxService : BoxService,public dialog: MatDialog) { }

  ngOnInit() {
   this.getAllBoxes();
   this.title = "Gestion des malles";
   this.noneObject = "Aucune malle référencée"
  }

  add(){
    this.box={id:null,name:this.name};
    this.boxService.addBox(this.box).subscribe(result =>{
      this.getAllBoxes();
    },err => console.error(err));
    this.name="";
  }

  getAllBoxes(){
    this.boxService.getAllBoxes().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  delete(id){    
    this.boxService.deleteBox(id).subscribe(result =>{
      this.getAllBoxes();
    },err => console.error(err));  
  }

  openDialog(object): void {
    let copy = Object.assign({}, object); 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data=copy;
    dialogConfig.width="250px";
    dialogConfig.disableClose=true;
    let dialogRef = this.dialog.open(ObjectDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      this.boxService.updateBox(result).subscribe(data =>{
        this.getAllBoxes();
      },err => console.error(err));  
    });
  }
}
