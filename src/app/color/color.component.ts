import { Component, OnInit } from '@angular/core';
import { Color } from './color.object';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ColorService } from './color.service';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
import { ObjectDanse } from '../shared/objectDanse';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
;

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  objects: Array<Color> = [];
  colorToAdd:Color; 
  color:Color;
  title:string;
  noneObject:string;
  wait:boolean;
  
  constructor(private colorService : ColorService,public dialog: MatDialog) { }

  ngOnInit() {
    this.wait = true;
    this.getAllColors();
    this.colorToAdd={id:null,name:"",colorCode:""}
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe((result:any) => { 
      this.objects=result.data;
      this.wait = false;
    },err => console.error(err));
  }

  add(){
    this.wait = true;
    this.color=this.colorToAdd;
    this.colorService.addColor(this.color).subscribe(result =>{
      this.getAllColors();
    },err => console.error(err));
    this.colorToAdd.name="";
    this.colorToAdd.colorCode="";
  }
  delete(id){
    this.wait = true;    
    this.colorService.deleteColor(id).subscribe(result =>{
      this.getAllColors();
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
    let dialogRef = this.dialog.open(ColorDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      this.wait = true;
      if(result !=null){
        this.colorService.updateColor(result).subscribe(data =>{
          this.getAllColors();
        },err => console.error(err)); 
      } 
    });
  }
  
  deleteDialog(id){
    let object = new ObjectDanse();
    object.id=id;
    object.name="cette couleur";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data=object;
    dialogConfig.disableClose=true;
    let dialogRef = this.dialog.open(CloseDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.wait = true;
     if(result !=null){
       this.delete(result.id);
     }
    });
  }  
}

