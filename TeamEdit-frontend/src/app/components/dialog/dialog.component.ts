import { Component, Injectable, ViewChild } from '@angular/core';
import { Note } from '../../models/note.model';
import {MatTable, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  // displayedColumns: string[] = ['name', 'lastEdited', 'action'];

  // note: Note[] = [
  //   {title: "test", content: "test", time: new Date()},
  //   {title: "test", content: "test", time: new Date()},
  //   {title: "test", content: "test", time: new Date()}
  // ];

  // dataSource = this.note;

  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;

  editData() {
    
  }

  removeData(i: any) {
    this.dataSource.splice(i,1);
    console.log("row " + i + "deleted");
    console.log(this.dataSource);
    this.table?.renderRows();
  }
}

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {name: 'Helium', weight: 4.0026, symbol: 'He'},
  {name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {name: 'Boron', weight: 10.811, symbol: 'B'},
  {name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



