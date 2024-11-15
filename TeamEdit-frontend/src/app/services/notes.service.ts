import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class NotesService {

  constructor(private httpClient: HttpClient) {}

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
}
