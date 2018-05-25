import { Component, OnInit } from '@angular/core';
import { SizeService } from './size.service';
import { ObjectDanse } from '../shared/objectDanse';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';

@Component({
  selector: 'app-size',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  size:ObjectDanse;
  title:string;
  noneObject:string;
  
  constructor(private sizeService : SizeService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCategories();
    this.title = "Gestion des tailles";
    this.noneObject = "Aucune taille référencée"
  }

  getAllCategories(){
    this.sizeService.getAllSizes().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  add(){
    this.size={id:null,name:this.name};
    this.sizeService.addSize(this.size).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
    this.sizeService.deleteSize(id).subscribe(result =>{
      this.getAllCategories();
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
      this.sizeService.updateSize(result).subscribe(data =>{
        this.getAllCategories();
      },err => console.error(err));  
    });
  }
}

