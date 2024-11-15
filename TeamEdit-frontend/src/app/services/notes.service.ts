import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotesService {
  public note: Note = {} as Note;
  dataSource: Note[] = [];


  constructor(private httpClient: HttpClient) {}

  // public requestNote(id: string): void {
  //   this.httpClient
  //   .get<Note>(`https://${environment.apiUrl}/notes/` + id)
  //   .subscribe({
  //     next: (response: Note) => {
  //       this.note = response;
  //       console.log(this.note);
  //     },
  //     error: (error) => console.error(error),
  //     complete: () => console.info('complete'),
  //   });
  // }

  public getNote(id: string){
    return this.httpClient.get<Note>(`${environment.apiUrl}/notes/${id}`);
  }

  public getAllNotes(){
    return this.httpClient.get<Array<Note>>(`${environment.apiUrl}/notes`);
  }

  public addNote(note: Note){
    return this.httpClient.post(`${environment.apiUrl}/notes/`, note);
  }

  public updateNote(id: string, note: Note){
    return this.httpClient.put(`${environment.apiUrl}/notes/${id}`, note);
  }

  public deleteNote(id: string){
    return this.httpClient.delete(`${environment.apiUrl}/notes/${id}`);
  }

  public requestGetNote(id: string): void {
    this.getNote(id)
    .subscribe({
      next: this.onNextNote,
      error: (error) => console.error(error),
      complete: () => console.info('GET request completed'),
    });
  }

  public requestGetAllNotes(): void{
    this.getAllNotes()
    .subscribe({
      next: this.onNextNotes,
      error: (error) => console.error(error),
      complete: () => console.info('GET request completed'),
    });
  }

  // public requestAddNote(note: Note): void{
  //   this.addNote(note)
  //   .subscribe({
  //     error: (error) => console.error(error),
  //     complete: () => console.info('POST request completed')
  //   });
  // }

  // public requestAddNote(note: Note): void {
  //   this.addNote(note)
  //     .subscribe({
  //       next: this.onNoteAdded,
  //       error: (error) => console.error(error),
  //       complete: () => console.info('POST request completed')
  //     });
  // }

  public requestAddNote(note: Note): void {
    this.addNote(note)
      .subscribe({
        error: (error) => console.error(error),
        complete: () => console.info('POST request completed')
      });
  }

  public requestUpdateNote(id: string, note: Note): void{
    this.updateNote(id, note)
    .subscribe({
      error: (error) => console.error(error),
      complete: () => console.info('PUT request completed')
    });
  }

  public requestDeleteNote(id: string): void{
    this.deleteNote(id)
    .subscribe({
      // next: () => {console.log('Note deleted with ID:', id)},
      error: (error) => console.error(error),
      complete: () => console.info('DELETE request completed'),
    });
  }

  private onNextNote = (response: Note): void => {
    this.note = response;
    console.log(response); // löschen!!!!!
    // console.log(this.note);

    // this.note.title = "new n1 title";
    // this.requestUpdateNote(this.note.id, this.note);
  };

  private onNextNotes = (response: Array<Note>): void => {
    this.dataSource = response;
    console.log(response); // löschen!!!!!
  };

  // private onNoteAdded = (response: Note): void => {
  //   console.log('Note added:', response);
  //   // this.requestGetAllNotes(); // Refresh the list after adding
  // };


  // `${environment.apiUrl}/notes/` + id


}
