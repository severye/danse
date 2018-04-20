import { Component, OnInit } from '@angular/core';
import { BoxService } from './box.service';
import { ObjectDanse } from '../shared/objectDanse';
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  objects: Array<ObjectDanse> = [];
  constructor(private boxService : BoxService) { }

  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((result:any) => { 
      this.objects=result.data;
    },err => console.error(err));
  }

}
