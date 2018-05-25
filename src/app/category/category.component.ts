import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ObjectDanse } from '../shared/objectDanse';
import { ObjectDialogComponent } from '../object-dialog/object-dialog.component';

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
  
  constructor(private categoryService : CategoryService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCategories();
    this.title = "Gestion des catégories";
    this.noneObject = "Aucune catégorie référencée"
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

  add(){
    this.category={id:null,name:this.name};
    this.categoryService.addCategory(this.category).subscribe(result =>{
      this.getAllCategories();
    },err => console.error(err));
    this.name="";
  }
  delete(id){    
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
      this.categoryService.updateCategory(result).subscribe(data =>{
        this.getAllCategories();
      },err => console.error(err));  
    });
  }
}
