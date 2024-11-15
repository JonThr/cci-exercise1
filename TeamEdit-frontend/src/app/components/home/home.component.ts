import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Y from 'yjs';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';
import { fromUint8Array } from 'js-base64';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public titleInput = "";
  public note: Note = {} as Note;
  dataSource: Note[] = [];
  displayedColumns: string[] = ['title', 'lastModified', 'actions'];

  @ViewChild(MatTable) table: MatTable<Note> | undefined;

  constructor(private notesService: NotesService, private matDialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.requestAllNotes();
  }

  newNote(){
    const note = <Note>{
      title: this.titleInput
    }

    const ydoc = new Y.Doc();
    note.content = this.convertYDocToBase64String(ydoc);
    this.addNote(note);
  }
  
  convertYDocToBase64String(ydoc: Y.Doc): string{  
    const documentState = Y.encodeStateAsUpdate(ydoc)
    const base64Encoded = fromUint8Array(documentState)
    return base64Encoded;    
  }

  editNote(i: any){
    this.requestNote(i);
  }

  openEditor(i: any) {
    console.log('open Dialog');
    const dialogRef = this.matDialog.open(EditorComponent, {
      width: '680px',
      maxWidth: '680px',
      maxHeight: '500px',
      disableClose: true,
      data: { content: this.note.content, room: this.note.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('close Dialog');

        let index: number = this.dataSource.findIndex(d => d.id === i);

        if(index !== -1){
          this.dataSource[index].content = result;
          let note = this.dataSource[index];
          this.updateNote(note.id, note);
        }

      } else {
        console.log("Dialog closed without data.");
      }
    });
  }

  removeNote(i: any){
    let index: number = this.dataSource.findIndex(d => d.id === i);

    if(index !== -1){
      let note = this.dataSource[index];
      this.dataSource.splice(index,1);
      this.deleteNote(note.id);
    }
  }

  public requestNote(id: string): void {
    this.notesService.getNote(id)
    .subscribe({
      next: (response) => {this.note = response},
      error: (error) => {  
        console.error(error);
        this.requestAllNotes();
      },
      complete: () => {
        console.info('GET request completed'); 
        this.openEditor(id);
      },
    });
  }
    
  public requestAllNotes(): void{
    this.notesService.getAllNotes()
    .subscribe({
      next: (response) => {
        this.dataSource = response
      },
      error: (error) => console.error(error),
      complete: () => console.info('GET request completed'),
    });
  }

  public updateNote(id: string, note: Note): void{
    this.notesService.updateNote(id, note)
    .subscribe({
      error: (error) => console.error(error),
      complete: () => {
        console.info('PUT request completed');
        this.requestAllNotes();
      }
    });
  }
  
  public addNote(note: Note): void {
    this.notesService.addNote(note)
      .subscribe({
        error: (error) => console.error(error),
        complete: () => {
          console.info('POST request completed'); 
          this.requestAllNotes();
        }
      });
  }

  public deleteNote(id: string): void{
    this.notesService.deleteNote(id)
    .subscribe({
      error: (error) => {
        console.error(error),
        this.requestAllNotes();
      },
      complete: () => {
        console.info('DELETE request completed');
        this.requestAllNotes();
      },
    });
  }
}