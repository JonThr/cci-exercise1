import { Component, Inject, inject, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { fromUint8Array, toUint8Array } from 'js-base64'
import { MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../services/notes.service';
import Highlight from '@tiptap/extension-highlight'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WebsocketProvider } from 'y-websocket';
import { v4 as uuidv4 } from 'uuid';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit{
  editor!: Editor;
  provider!: WebsocketProvider;
  isSaveIcon = false;
  public ydoc: Y.Doc = {} as Y.Doc;
  public userColor = "#ff0000";
  public username = "user" + uuidv4(); 
  readonly dialogRef = inject(MatDialogRef<EditorComponent>);

  constructor(private notesService: NotesService, @Inject(MAT_DIALOG_DATA) public note: {content: string, id: string}){}

  ngOnInit(): void {
    this.ydoc = new Y.Doc();
    this.provider = new WebsocketProvider('wss://demos.yjs.dev/ws', this.note.id, this.ydoc);

    this.editor = new Editor({
      element: document.querySelector('.tiptap') as Element,
      extensions: [StarterKit,        
        Highlight.configure({ multicolor: true }),
        Placeholder.configure({
          placeholder: 'Write something...', 
      }),
      Collaboration.configure({
        document: this.ydoc, 
      }),
            CollaborationCursor.configure({
        provider: this.provider,
        user: {
          name: this.username,
          color: this.userColor,
        },
      }),
    ],      
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    }
    });

    this.convertBase64StringToYDoc(this.note.content);
    console.log('init editor');
  }

  toggleIcon() {
    this.isSaveIcon = !this.isSaveIcon;
  }

  closeEditor(): void {
    let base64Encoded = this.convertYDocToBase64String(this.ydoc); 

    setTimeout(() => {
      this.dialogRef.close(base64Encoded);
    }, 500);
  }
  
  convertYDocToBase64String(ydoc: Y.Doc): string{  
    const documentState = Y.encodeStateAsUpdate(ydoc)
    const base64Encoded = fromUint8Array(documentState)
    return base64Encoded;    
  }

  convertBase64StringToYDoc(base64Encoded: string): void{  
    const binaryEncoded = toUint8Array(base64Encoded)
    Y.applyUpdate(this.ydoc, binaryEncoded);
  }

  private cleanup = () =>{
    if (this.provider){
      this.provider.destroy();
      window.removeEventListener('beforeunload', this.cleanup);
    }
  };
}