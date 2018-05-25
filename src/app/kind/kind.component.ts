import { Component, OnInit } from '@angular/core';
import { ObjectDanse } from '../shared/objectDanse';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { KindService } from './kind.service';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';

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
  
  constructor(private kindService : KindService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCategories();
    this.title = "Gestion des genres";
    this.noneObject = "Aucun genre référencé"
  }

  getAllCategories(){
    this.kindService.getAllKinds().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  add(){
    this.kind={id:null,name:this.name};
    this.kindService.addKind(this.kind).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
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
      this.kindService.updateKind(result).subscribe(data =>{
        this.getAllCategories();
      },err => console.error(err));  
    });
  }

}
