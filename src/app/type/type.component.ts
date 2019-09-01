import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDanse } from '../shared/objectDanse';
import { TypeService } from './type.service';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';
import { SuperTypeService } from '../supertype/supertype.service';
import { TypeDialogComponent } from './type-dialog/type-dialog.component';
import { Type } from './type.object';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  objects: Array<Type> = [];
  name:string;  
  type:Type;
  title:string;
  noneObject:string;
  typeAdd:Type;
  superTypes : Array<ObjectDanse> =[];
  wait : boolean;
  
  constructor(private typeService : TypeService,public dialog: MatDialog, private superTypeService: SuperTypeService) { }

  ngOnInit() {
    this.wait = true;
    this.getAllTypes();
    this.title = "Gestion des modèles";
    this.noneObject = "Aucun modèle référencé";
    this.typeAdd=new Type();
    this.superTypeService.getAllSuperTypes().subscribe((result:any) => { 
      this.superTypes=result.data;
    },err => console.error(err));
  }

  getAllTypes(){
    this.typeService.getAllTypes().subscribe((result:any) => { 
      this.objects=result.data;
      this.wait = false;
    },err => console.error(err));
  }

  add(){
    this.wait = true;
    this.type=this.typeAdd;
    this.typeService.addType(this.type).subscribe(result =>{
      this.getAllTypes();
    },err => console.error(err));
    this.typeAdd.name="";
    this.typeAdd.superType.id="";
  }
  delete(id){
    this.wait = true;    
    this.typeService.deleteType(id).subscribe(result =>{
      this.getAllTypes();
    },err => console.error(err));  
  }

  openDialog(object): void {
    let copy = Object.assign({}, object); 
    if(copy.superType ==null){
      copy.superType = new ObjectDanse();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data=copy;
    dialogConfig.width="250px";
    dialogConfig.disableClose=true;
    let dialogRef = this.dialog.open(TypeDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      this.wait = true;
      result.idSuperType=result.superType.id;
      if(result !=null){
        this.typeService.updateType(result).subscribe(data =>{
          this.getAllTypes();
        },err => console.error(err));  
      }
    });
  }
  
  deleteDialog(id){
    let object = new ObjectDanse();
    object.id=id;
    object.name="ce modèle";
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
