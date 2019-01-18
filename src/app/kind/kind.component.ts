import { Component, OnInit } from '@angular/core';
import { ObjectDanse } from '../shared/objectDanse';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { KindService } from './kind.service';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';

@Component({
  selector: 'app-kind',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./kind.component.css']
})
export class KindComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  kind:ObjectDanse;
  title:string;
  noneObject:string;
  wait:boolean;
  
  constructor(private kindService : KindService,public dialog: MatDialog) { }

  ngOnInit() {
    this.wait = true;
    this.getAllCategories();
    this.title = "Gestion des genres";
    this.noneObject = "Aucun genre référencé"
  }

  getAllCategories(){
    this.kindService.getAllKinds().subscribe((result:any) => { 
      this.objects=result.data;
      this.wait = false;
    },err => console.error(err));
  }

  add(){
    this.wait = true;
    this.kind={id:null,name:this.name};
    this.kindService.addKind(this.kind).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
    this.wait = true;
    this.kindService.deleteKind(id).subscribe(result =>{
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
      if(result !=null){
        this.wait = true;
        this.kindService.updateKind(result).subscribe(data =>{
          this.getAllCategories();
        },err => console.error(err));
      }  
    });
  } 
  
  deleteDialog(id){
    let object = new ObjectDanse();
    object.id=id;
    object.name="ce genre";
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
