import { Component, Inject, inject, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { fromUint8Array, toUint8Array } from 'js-base64'
import { MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../services/notes.service';
// import { Note } from '../../models/note.model';
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
  // test = "";

  constructor(private notesService: NotesService, @Inject(MAT_DIALOG_DATA) public note: {content: string, room: string}){}

  ngOnInit(): void {
    // this.test = "test";
    // console.log("TEST:");
    // console.log(this.test);
    // console.log("ydoc old:");
    // console.log( this.ydoc);
    this.ydoc = new Y.Doc();
    // console.log("ydoc new Y.DOc:");
    // console.log( this.ydoc);
    // console.log("room:");
    // console.log(this.note.room);
    // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'quill-demo-room', this.ydoc);
    this.provider = new WebsocketProvider('wss://demos.yjs.dev/ws', this.note.room, this.ydoc);
    // this.convertBase64StringToYDoc(this.note.content);

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
    // console.log("ydoc new:");
    // console.log(this.ydoc);
    console.log('init editor');
  }

  toggleIcon() {
    this.isSaveIcon = !this.isSaveIcon;
  }

  closeEditor(): void {
    let base64Encoded = this.convertYDocToBase64String(this.ydoc); // im home convertieren
    // erstelle neue Note -> d.h. brauchen NoteDataService und dort createNote
    // this.requestUpdateNote();

    setTimeout(() => {
      this.dialogRef.close(base64Encoded); // hier y.doc returnen u. im home convertieren
    }, 500);
  }
  
  // public requestUpdateNote(id: string, note: Note): void{
  //   this.notesService.updateNote(id, note)
  //   .subscribe({
  //     error: (error) => console.error(error),
  //     complete: () => console.info('PUT request completed')
  //   });
  // }

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

































// import { AfterViewInit, Component, Inject, inject, OnInit } from '@angular/core';
// import {CdkDrag} from '@angular/cdk/drag-drop';
// import { Editor } from '@tiptap/core'
// import StarterKit from '@tiptap/starter-kit'
// import Placeholder from '@tiptap/extension-placeholder'
// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Collaboration from '@tiptap/extension-collaboration'
// import * as Y from 'yjs'
// import Bold from '@tiptap/extension-bold';
// import Italic from '@tiptap/extension-italic';
// import Heading from '@tiptap/extension-heading';
// import Blockquote from '@tiptap/extension-blockquote';
// import Strike from '@tiptap/extension-strike';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import ListItem from '@tiptap/extension-list-item';
// import CodeBlock from '@tiptap/extension-code-block';
// import { fromUint8Array, toUint8Array } from 'js-base64'
// import { MatDialogRef } from '@angular/material/dialog';
// import { NotesService } from '../../services/notes.service';
// import { Note } from '../../models/note.model';
// import Highlight from '@tiptap/extension-highlight'
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { WebsocketProvider } from 'y-websocket';
// import { v4 as uuidv4 } from 'uuid';
// import { HocuspocusProvider, TiptapCollabProvider } from '@hocuspocus/provider';
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'

// @Component({
//   selector: 'app-editor',
//   templateUrl: './editor.component.html',
//   styleUrl: './editor.component.scss',
// })
// export class EditorComponent implements OnInit{
//   editor!: Editor;
//   public ydoc: Y.Doc = {} as Y.Doc;
//   readonly dialogRef = inject(MatDialogRef<EditorComponent>);
//   isSaveIcon = false;
//   public provider: any;
//   public userColor = "#ff0000";
//   public username = "user" + uuidv4(); 
//   public awareness: any;
//   toggleIcon() {
//     this.isSaveIcon = !this.isSaveIcon;
//   }

//   constructor(private notesService: NotesService, @Inject(MAT_DIALOG_DATA) public note: {content: string}){

//   }

//   ngOnInit(): void {
// //     const lowlight = createLowlight(all)
// //     lowlight.register('html', html)
// // lowlight.register('css', css)
// // lowlight.register('js', js)
// // lowlight.register('ts', ts)



//     this.ydoc = new Y.Doc();
//     // const yText = this.ydoc.getText('sharedText');


//     // this.convertBase64StringToYDoc(this.note.content);

//     // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'quill-demo-room', this.ydoc);

//     this.editor = new Editor({
//       element: document.querySelector('.tiptap') as Element,
//       extensions: [StarterKit,        
//         // Bold,
//         // Italic,
//         // Blockquote,
//         // Strike,
//         // CodeBlockLowlight.configure({
//         //   lowlight,
//         // }),
//         Highlight.configure({ multicolor: true }),
//         // Heading.configure({
//         //   levels: [1, 2, 3],
//         // }),
//         Placeholder.configure({
//           placeholder: 'Write something...',  // Set your placeholder text here
//       }),
//       // CollaborationCursor.configure({
//       //   provider: provider,
//       //   user: {
//       //     name: this.username,
//       //     color: this.userColor,
//       //   },
//       // }),
      
//       // Document,
//       // Paragraph,
//       // Text,
//       Collaboration.configure({
//         document: this.ydoc, // Configure Y.Doc for collaboration
//       }),
//       // CodeBlock
//     ],      
//     // content: '<p>Initial Content</p>',
//     editorProps: {
//       attributes: {
//         class: 'focus:outline-none',
//       },
//     }


//       // content: '<h3>Example Text</h3></br>',
// //       content: `
// //         <p>
// //           That’s a boring paragraph followed by a fenced code block:
// //         </p>
// //         <pre><code>for (var i=1; i <= 20; i++)
// // {
// //   if (i % 15 == 0)
// //     console.log("FizzBuzz");
// //   else if (i % 3 == 0)
// //     console.log("Fizz");
// //   else if (i % 5 == 0)
// //     console.log("Buzz");
// //   else
// //     console.log(i);
// // }</code></pre>
// //         <p>
// //           Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
// //         </p>
// //       `,
//     });

//     // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'quill-demo-room', this.ydoc);
    
//     // const provider = new TiptapCollabProvider({
//     //   name: 'document.name',
//     //   baseUrl: 'wss://demos.yjs.dev',
//     //   token: 'notoken',
//     //   document: this.ydoc
//     // })

//     // // Set the awareness field for the current user
//     // provider.setAwarenessField('user', {
//     // // Share any information you like
//     //   name: this.username,
//     //   color: this.userColor,
//     // })


//     // const provider = new HocuspocusProvider({
//     //   url: "ws://127.0.0.1",
//     //   name: "example-document",
//     //   document: this.ydoc,
//     // });

//     // this.awareness = provider.awareness



//     // yText.insert(0, 'Hello, Yjs!');
//     this.convertBase64StringToYDoc(this.note.content);
//     // this.editor.commands.focus();

//     // this.setUsername();
  
//     // this.awareness.on('change', () =>{
//     //   this.setUsername();
//     // })

    
//   }

//   setUser(){
//     this.editor.commands.updateUser({
//       name: 'John Doe',
//       color: 'white',
//     })
//   }

//   //   setUsername = () => {
//   //   this.awareness.setLocalStateField('user', { name: this.username, color: this.userColor })
//   // }

//   closeEditor(): void {
//     let base64Encoded = this.convertYDocToBase64String(this.ydoc);
//     // erstelle neue Note -> d.h. brauchen NoteDataService und dort createNote
//     // this.requestUpdateNote();

//     setTimeout(() => {
//       this.dialogRef.close(base64Encoded);
//     }, 500); // 2000 ms = 2 seconds delay
//   }
  
//   public requestUpdateNote(id: string, note: Note): void{
//     this.notesService.updateNote(id, note)
//     .subscribe({
//       error: (error) => console.error(error),
//       complete: () => console.info('PUT request completed')
//     });
//   }

//   convertYDocToBase64String(ydoc: Y.Doc): string{  
//     const documentState = Y.encodeStateAsUpdate(ydoc)
//     const base64Encoded = fromUint8Array(documentState)
//     return base64Encoded;    
//   }

//   convertBase64StringToYDoc(base64Encoded: string): void{  
//     const binaryEncoded = toUint8Array(base64Encoded)
//     Y.applyUpdate(this.ydoc, binaryEncoded);
//   }
// }

