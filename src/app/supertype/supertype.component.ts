import { Component, OnInit } from '@angular/core';
import { ObjectDanse } from '../shared/objectDanse';
import { SuperTypeService } from './supertype.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';

@Component({
  selector: 'app-supertype',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./supertype.component.css']
})
export class SupertypeComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  superType:ObjectDanse;
  title:string;
  noneObject:string;
  wait:boolean;
  
  constructor(private superTypeService : SuperTypeService,public dialog: MatDialog) { }

  ngOnInit() {
    this.wait = true;
    this.getAllSuperTypes();
    this.title = "Gestion des types de modèle";
    this.noneObject = "Aucun type de modèle référencé"
  }

  getAllSuperTypes(){
    this.superTypeService.getAllSuperTypes().subscribe((result:any) => { 
      this.objects=result.data;
      this.wait = false;
    },err => console.error(err));
  }

  add(){
    this.wait = true;
    this.superType={id:null,name:this.name};
    this.superTypeService.addSuperType(this.superType).subscribe(result =>{
      this.getAllSuperTypes();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
    this.wait = true;
    this.superTypeService.deleteSuperType(id).subscribe(result =>{
      this.getAllSuperTypes();
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
      this.wait = true;
      if(result !=null){
        this.superTypeService.updateSuperType(result).subscribe(data =>{
          this.getAllSuperTypes();
        },err => console.error(err));  
      }
    });
  }
  
  deleteDialog(id){
    let object = new ObjectDanse();
    object.id=id;
    object.name="ce type de modèle";
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
