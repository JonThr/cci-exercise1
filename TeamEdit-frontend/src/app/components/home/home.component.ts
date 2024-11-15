import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Y from 'yjs';
import { v4 as uuidv4 } from 'uuid';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';
import { MatSort } from '@angular/material/sort';
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

  // public room = 'quill-demo-room';
  // public userColor = "#ff0000";
  // public username = "user" + uuidv4(); 
  // notes = Array<Note>();

  // @ViewChild(MatSort) sort = {} as MatSort;

  // ydoc = new Y.Doc();
  // documentList = this.ydoc.getArray('doc-list');

  // public awareness: any;
  // public quill: any;
  // public binding: any;
  // public ytext: any;

  constructor(private notesService: NotesService, private matDialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.requestAllNotes();
  }

  newNote(){
    this.note.title  = this.titleInput;
    const ydoc = new Y.Doc();
    this.note.room = uuidv4(); // id nehmen?
    this.note.content = this.convertYDocToBase64String(ydoc);
    // console.log("ROOM:")
    // console.log(this.note.room);
    this.addNote(this.note);
    this.dataSource.push(this.note);
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
      // data: { content: note.content }
      data: { content: this.note.content, room: this.note.room } // note or zusätzlich note.id für room?
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('close Dialog');
        // console.log("Dialog data:", result);

        let index: number = this.dataSource.findIndex(d => d.id === i);

        if(index !== -1){
          this.dataSource[index].content = result;
          // this.dataSource[index].time = new Date();
          let note = this.dataSource[index];
          this.updateNote(note.id, note);
          // this.requestAllNotes();
        }

      } else {
        console.log("Dialog closed without data.");
      }
    });
  }

  removeNote(i: any){ //verhindert keine HTTP STATUS CODE 404! -> muss man das überhaupt + wenn ja -> lösung: GET ALL or GET um datasuorce zu updaten und dann drin suchen
    let index: number = this.dataSource.findIndex(d => d.id === i);

    if(index !== -1){
      let note = this.dataSource[index];
      this.dataSource.splice(index,1);
      this.deleteNote(note.id);
    }

    // this.requestAllNotes();

    // let exists = !!this.dataSource[i]; // MUSS hier get request zuerst machen OR in error von delete!!!

    // if (exists == true){
    //   let note = this.dataSource[i];
    //   this.DeleteNote(note.id);
    //   this.dataSource.splice(i,1); // das in next packen?
    // }

    // this.requestAllNotes();
  }

  public requestNote(id: string): void {
    this.notesService.getNote(id)
    .subscribe({
      next: (response) => {this.note = response},
      error: (error) => console.error(error),
      complete: () => {
        console.info('GET request completed'); 
        this.openEditor(id);
      },
    });
  }
  
  // private onNextNote = (response: Note): void => {
  //   this.note = response;
  //   console.log(response); // löschen!!!!!
  //   // console.log(this.note);

  //   // this.note.title = "new n1 title";
  //   // this.requestUpdateNote(this.note.id, this.note);
  // };

  
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

  // private onNextNotes = (response: Array<Note>): void => {
  //   this.dataSource = response;
  // };

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
      // next: () => {console.log('Note deleted with ID:', id)},
      error: (error) => console.error(error),
      complete: () => {
        console.info('DELETE request completed');
        this.requestAllNotes();
      },
    });
  }
}