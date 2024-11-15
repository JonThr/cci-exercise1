// import {
//     AfterViewInit,
//     Component,
//     OnInit,
//     ViewChild,
//     AfterViewChecked,
//   } from '@angular/core';
//   import Quill from 'quill';
//   import { QuillModule } from 'ngx-quill';
//   import { DialogComponent } from '../dialog/dialog.component';
//   import { MatDialog } from '@angular/material/dialog';
//   import * as Y from 'yjs';
//   import { QuillBinding } from 'y-quill';
//   import { WebrtcProvider } from 'y-webrtc';
//   import QuillCursors from 'quill-cursors';
//   import { v4 as uuidv4 } from 'uuid';
//   import { TiptapCollabProvider } from '@hocuspocus/provider'
  
//   @Component({
//     selector: 'app-home',
//     templateUrl: './home.component.html',
//     styleUrl: './home.component.scss',
//   })
//   export class HomeComponent implements OnInit {
//     public titleInput= '';
//     quill: any;
//     binding: any;
//     // quill: Quill | undefined;
//     // binding: QuillBinding | undefined;
//     // ydoc: any;
//     // binding = null;
//     ytext: any;
//     public room = 'quill-demo-room';
//     public userColor = "#ff0000";
//     awareness: any;
//     public username = "user" + uuidv4(); 
//     provider: any;
//     ydoc = new Y.Doc();
//     documentList = this.ydoc.getArray('doc-list');
  
//     clearEditor() {
//       // title muss auch noch in QUILL drin sein!!!!!!! -> weil soll auch gleichzeitig passieren!!!!!!!
//       this.room = 'test';
//       this.ydoc = new Y.Doc();
//       this.ytext = this.ydoc.getText('quill');
//       const binding = new QuillBinding(this.ytext, this.quill);
//       const provider = new WebrtcProvider(this.room, this.ydoc);
  
//       this.titleInput = '';
//       this.quill.deleteText(0, this.quill.getLength());
//       console.log('quill editor cleared');
//     }
  
  
//     // new Note: (var 1: button in home -> title u. text eingeben -> dann save klicken | var 2: buttin in notes dialog -> eingabe von title -> note wird erstellt -> wird auf home geleitet)
//     // 1. Wechsel room d.h. Note erhält eindeutigen Room
  
//     constructor(private matDialog: MatDialog) {
//       // This Y.Array contains a list of documents represented as Y.Text
//       // const documentList = this.ydoc.getArray('doc-list')
//     }
  
//     bindEditor(ytext: Y.Text){
//       if(this.binding){
//         this.binding.destroy();
//       }
  
//       if(this.quill === null){
//         this.quill = new Quill('#editor', {
//           modules: {
//             cursors: true,
//             toolbar: [
//               [{ header: [1, 2, false] }],
//               ['bold', 'italic', 'underline'],
//               ['image', 'code-block'],
//             ],
//             history: {
//               userOnly: true,
//             },
//           },
//           placeholder: 'Start collaborating...',
//           theme: 'snow',
//         });
//       }
  
//       this.binding = new QuillBinding(ytext, this.quill, this.awareness);
//     }
  
  
  
//     ngOnInit(): void {
//       Quill.register('modules/cursors', QuillCursors);
  
//     //   this.provider = new WebrtcProvider(this.room, this.ydoc);
//     //   this.awareness = this.provider.awareness
  
//     //   const newDoc = new Y.Text()
//     //   this.quill = new Quill('#editor', {
//     //     modules: {
//     //       cursors: true,
//     //       toolbar: [
//     //         [{ header: [1, 2, false] }],
//     //         ['bold', 'italic', 'underline'],
//     //         ['image', 'code-block'],
//     //       ],
//     //       history: {
//     //         userOnly: true,
//     //       },
//     //     },
//     //     placeholder: 'Start collaborating...',
//     //     theme: 'snow',
//     //   });
    
  
//     // this.binding = new QuillBinding(newDoc, this.quill, this.awareness);
//     //   // this.bindEditor(newDoc);
//     //   // this.documentList.push([newDoc]);
  
  
  
//     //   this.setUsername()
  
//     //   this.awareness.on('change', () =>{
//     //     this.setUsername()
//     //   })
  
  
      
  
  
//       const newNote = new Y.Text();
//       // this.bindEditor(newNote);
  
//       this.quill = new Quill('#editor', {
//         modules: {
//           cursors: true,
//           toolbar: [
//             // adding some basic Quill content features
//             [{ header: [1, 2, false] }],
//             ['bold', 'italic', 'underline'],
//             ['image', 'code-block'],
//           ],
//           history: {
//             // Local undo shouldn't undo changes
//             // from remote users
//             userOnly: true,
//           },
//         },
//         placeholder: 'Start collaborating...',
//         theme: 'snow', // 'bubble' is also great
//       });
  
//       // this.ydoc = new Y.Doc();
//       this.provider = new WebrtcProvider(this.room, this.ydoc); // 1. das hier ÄNDERN!!!!!!!!! 2. HOcus pocus server ertsellen 3. mit sql lite db 4. testen wie man z.B. speichert 
      
//       // this.provider = new TiptapCollabProvider({
//       //   name: 'quill', // Document identifier
//       //   baseUrl: 'ws://127.0.0.1:1234', // replace with YOUR_APP_ID from Cloud dashboard
//       //   document: this.ydoc,
//       // })
  
//       // All network providers implement the awareness protocol. You can use it to propagate information about yourself.
//       this.awareness = this.provider.awareness
     
//       // // A Yjs document holds the shared data
//       // const ydoc = new Y.Doc()
//       // // This Y.Array contains a list of documents represented as Y.Text
//       // const documentList = ydoc.getArray('doc-list')
//       this.ytext = this.ydoc.getText('quill'); // --> wenn man kein array hat! -> weil ytext muss von ydoc kommen
//       // this.ytext = new Y.Text() // --> her braucht man array --> array muss mit provider gebunden sein
//       console.log(this.ytext);
//       this.binding = new QuillBinding(this.ytext, this.quill, this.awareness);
      
  
    
//       // "Bind" the quill editor to a Yjs text type.
//       // The QuillBinding uses the awareness instance to propagate your cursor location.
//       // binding = new QuillBinding(ytext, quill, awareness)
      
      
      
//       // const usercolors = [
//       //   '#30bced',
//       //   '#6eeb83',
//       //   '#ffbc42',
//       //   '#ecd444',
//       //   '#ee6352',
//       //   '#9ac2c9',
//       //   '#8acb88',
//       //   '#1be7ff'
//       // ]
  
//       // const myColor = usercolors[Math.floor(Math.random() * usercolors.length)]
  
//       // this.provider.setAwarenessField("user", {
//       //   name: this.username,
//       //   color: this.userColor,
//       // });
  
//       this.setUsername()
  
//       this.awareness.on('change', () =>{
//         this.setUsername()
//       })
//     }
  
//     setUsername = () => {
//       this.awareness.setLocalStateField('user', { name: this.username, color: this.userColor })
//     }
  
  
  
  
//     openDialog() {
//       console.log('open Dialog');
//       this.matDialog.open(DialogComponent, {
//         width: '700px',
//         minHeight: '750px',
//       });
//     }
//   }
  
//   //TODOS: 
//   // 1. list von nodes etc. in frontend implementeiren siehe ganz unten + yjs shared types website
//   // 2. backend implementerein javascript (1x var 1 mit hocuspocus und 1x mit y-websocket) und dann 1x SIGNALR + 1x REST ausprobieren
//   // ZUERST VAR 1 probieren -> dann VAR 2 probieren (TIPP NW Programmierung Bachelor Videos ansehen) -> wenn alles nicht funkt dann VAR 3
//   // VAR 1: 1x custom Backend alles Javascript -> z.b. hat auch garbage collector d.h. wenn z.b. jemand weg ist dann wird die verbindung destroyed ABER bei custom z.B. save -> muss ich selbst fehler handlen!
//   // NOTE: TipTapCollabProvider braucht glaub ich local einen eigenen server (d.h. muss den starten!) 
//   // Note: Brauche für alle eigenes backend siehe links unten (außer bei TipTapCollabProvider wenn appId verwendet wird!?)
//   // https://github.com/yjs/yjs-demos/blob/main/demo-server/demo-server.js#L37
//   // https://github.com/yjs/yjs-demos/blob/main/quill/quill.js
//   // https://stackoverflow.com/questions/3155528/can-i-broadcast-to-all-websocket-clients
//   // https://github.com/yjs/y-websocket/blob/5db415ab9b584dc1cd9a362e70fb8e976f21d6cd/bin/server.js
//   // https://tiptap.dev/docs/hocuspocus/provider/examples
//   // https://tiptap.dev/docs/hocuspocus/getting-started
//   // https://tiptap.dev/docs/collaboration/provider/integration
  
//   // VAR 2: 1x custom Backend alles C# 
//   // https://github.com/yjs/ycs/tree/main/samples/YcsSample 
  
//   // VAR 3: 1x custom SignalR/REST Backend + 1x fertiger YJS Provider Server
//   // extra signalR/REST backend und extra yjs provider server (z.B. ywebsocket or hocuspocus) / or tiptapcollabprovider
  
  
  
//   // 1. onINIT -> new quill -> new QuillBinding
//   // 2. neues dok erstellen -> newDoc = new Y.Text -> documentList.push([newDoc]) -> bindEditor(newDoc) ----> if (bindning) dann binding.destroy() -> new QuillBinding
  
//   // let quill = null
//   // let binding = null
  
//   // // Bind editor to a new ytext type
//   // const bindEditor = ytext => {
//   //   if (binding) {
//   //     // We can reuse the existing editor. But we need to remove all event handlers
//   //     // that we registered for collaborative editing before binding to a new editor binding
//   //     binding.destroy()
//   //   }
//   //   if (quill === null) {
//   //     // This is the first time a user opens a document.
//   //     // The editor has not been initialized yet.
//   //     // Create an editor instance.
//   //     quill = new Quill(document.querySelector('#editor'), {
//   //       modules: {
//   //         cursors: true,
//   //         toolbar: [
//   //           // adding some basic Quill content features
//   //           [{ header: [1, 2, false] }],
//   //           ['bold', 'italic', 'underline'],
//   //           ['image', 'code-block']
//   //         ],
//   //         history: {
//   //           // Local undo shouldn't undo changes
//   //           // from remote users
//   //           userOnly: true
//   //         }
//   //       },
//   //       placeholder: 'Start collaborating...',
//   //       theme: 'snow' // 'bubble' is also great
//   //     })
//   //   }
//   //   // "Bind" the quill editor to a Yjs text type.
//   //   // The QuillBinding uses the awareness instance to propagate your cursor location.
//   //   binding = new QuillBinding(ytext, quill, awareness)
//   // }
  
  
  
//   // "NEW NOTE / SAVE NOTE" BUTTON CLICK  --> FALLS SAVE NOTE braucht dann aber noch backend/db call 
//   //   if (ERSTELLE NEW DOCUMENT) {
//   //     // create a new document
//   //     const newDoc = new Y.Text()
//   //     // Set initial content with the headline being the index of the documentList
//   //     documentList.push([newDoc])
//   //     bindEditor(newDoc)
//   //   } 
  
//   // "LÖSCHEN" BUTTON CLICK 
//   //  if (LÖSCHE DOCUMENT) {
//   //     // remove all documents
//   //     documentList.delete(index)
//   //   }
  
  
  
//   // } if (laden eines docs) {
//   //   // The index is a number, render the $i-th document
//   //   const index = Number.parseInt(val)
//   //   bindEditor(documentList.get(index))
//   // }
//   // })