import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoteForm extends Component {
  state = { newNoteContent: '' };

  handleUserInput = e => {
    this.setState({
      newNoteContent: e.target.value
    });
  };

  writeNote = () => {
    this.props.addNote(this.state.newNoteContent);
    this.setState({
      newNoteContent: ''
    });
  };

  render() {
    return (
      <div className="note-form">
        <input
          className="note-input"
          placeholder="Write a new note..."
          onChange={this.handleUserInput}
          value={this.state.newNoteContent}
        />
        <button className="note-button" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

NoteForm.proptypes = { newNoteContent: PropTypes.string };

export default NoteForm;
