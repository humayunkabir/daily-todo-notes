import React, { Component, Fragment } from 'react';
import './App.css';
import Note from './Components/Note';
import NoteForm from './Components/NoteForm';
import { DB_CONFIG } from './config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
  state = {
    notes: []
  };

  app = firebase.initializeApp(DB_CONFIG);
  db = this.app
    .database()
    .ref()
    .child('notes');

  componentWillMount() {
    const prevNotes = this.state.notes;

    // DataSnapshot
    this.db.on('child_added', snapshot => {
      prevNotes.push({
        id: snapshot.key,
        noteContent: snapshot.val().noteContent
      });

      this.setState({ notes: prevNotes });
    });

    this.db.on('child_removed', snapshot => {
      // prevNotes.map(item => {
      //   if (item.id === snapshot.key) console.log(item);
      // });

      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id === snapshot.key) prevNotes.splice(i, 1);
      }

      this.setState({ notes: prevNotes });
    });
  }

  addNote = note => this.db.push().set({ noteContent: note });
  removeNote = noteId => this.db.child(noteId).remove();

  render() {
    return (
      <Fragment>
        <header>
          <h1>React & Firebase Daily Todo Notes</h1>
        </header>
        <main>
          <div className="notes-wrapper">
            {this.state.notes.map(note => (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={this.removeNote}
              />
            ))}
          </div>
        </main>
        <footer>
          <NoteForm addNote={this.addNote} />
        </footer>
      </Fragment>
    );
  }
}

export default App;
