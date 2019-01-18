import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDanse } from '../shared/objectDanse';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';
import { CloseDialogComponent } from '../close-dialog/close-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: '../shared/views/object-danse.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  name:string;  
  category:ObjectDanse;
  title:string;
  noneObject:string;
  wait:boolean;
  
  constructor(private categoryService : CategoryService,public dialog: MatDialog) { }

  ngOnInit() {
    this.wait = true;
    this.getAllCategories();
    this.title = "Gestion des catégories";
    this.noneObject = "Aucune catégorie référencée"
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((result:any) => { 
      this.objects=result.data;
      this.wait = false;
    },err => console.error(err));
  }

  add(){
    this.wait = true;
    this.category={id:null,name:this.name};
    this.categoryService.addCategory(this.category).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
    this.wait = true;
    this.categoryService.deleteCategory(id).subscribe(result =>{
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
      this.wait = true;
      if(result !=null){
        this.categoryService.updateCategory(result).subscribe(data =>{
          this.getAllCategories();
        },err => console.error(err));  
      }
    });
  }
  
  deleteDialog(id){
    let object = new ObjectDanse();
    object.id=id;
    object.name="cette catégorie";
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
