# TeamEdit
`TeamEdit` is a simple collaborative notes editor web app deployed on Microsoft Azure, which supports:
* Create, edit and delete a shared note
* Show a list of all notes
* Enables real-time collaboration

**Frontend**: https://blue-bay-0c0e74703.5.azurestaticapps.net <br>
**Backend**: fhwndbcci.database.windows.net

## Technology Stack
* **Frontend**: Angular (18.x)
* **Backend**: ASP&#46;NET Core Web API (Minimal API)
* **Database**: Azure SQL Database
* **Real-time collaboration**: Yjs
* **WYSIWYG-Editor**: TipTap Editor

## Project Structure
The project contains the frontend `TeamEdit-frontend` and `TeamEdit-backend` 


## Model

    public class Note(Guid id, string title, string content, DateTime lastModified) 
    {
    
	    public Note() : this(Guid.NewGuid(), string.Empty, string.Empty, DateTime.Now){}
		
	    public Guid Id { get; set; } = id;
	    public string Title { get; set; } = title;
	    public string Content { get; set; } = content;
	    public DateTime LastModified { get; set; } = lastModified;
	}


## API

 - **GET** /notes/{id} - Get a note
 - **GET** /notes - Get all notes
 - **POST** /notes - Create a note
 - **PUT** /notes - Create or update a note
 - **DELETE** /notes/{id} - Delete a note
