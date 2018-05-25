import { Component, OnInit } from '@angular/core';
import { Color } from './color.object';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ColorService } from './color.service';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
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
  
  constructor(private colorService : ColorService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllColors();
    this.colorToAdd={id:null,name:"",colorCode:""}
  }

  getAllColors(){
    this.colorService.getAllColors().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  add(){
    this.color=this.colorToAdd;
    console.log(this.color);
    this.colorService.addColor(this.color).subscribe(result =>{
      this.getAllColors();
    },err => console.error(err));
    this.colorToAdd.name="";
    this.colorToAdd.colorCode="";
  }
  delete(id){    
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
      this.colorService.updateColor(result).subscribe(data =>{
        this.getAllColors();
      },err => console.error(err));  
    });
  }
}

