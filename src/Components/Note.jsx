import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {
  render() {
    const { noteContent, noteId, removeNote } = this.props;
    return (
      <div className="note fade-in">
        <p className="note-content">{noteContent}</p>
        <button
          className="button-remove-note"
          onClick={() => removeNote(noteId)}
        >
          x
        </button>
      </div>
    );
  }
}

Note.proptypes = { noteContent: PropTypes.string };

export default Note;
