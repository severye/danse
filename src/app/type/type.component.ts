import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDanse } from '../shared/objectDanse';
import { TypeService } from './type.service';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';

@Component({
  selector: 'app-type',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  type:ObjectDanse;
  title:string;
  noneObject:string;
  
  constructor(private typeService : TypeService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCategories();
    this.title = "Gestion des modèles";
    this.noneObject = "Aucun modèle référencé"
  }

  getAllCategories(){
    this.typeService.getAllTypes().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  add(){
    this.type={id:null,name:this.name};
    this.typeService.addType(this.type).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
    this.typeService.deleteType(id).subscribe(result =>{
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
      this.typeService.updateType(result).subscribe(data =>{
        this.getAllCategories();
      },err => console.error(err));  
    });
  }
}
