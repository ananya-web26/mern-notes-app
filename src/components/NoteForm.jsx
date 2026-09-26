import { useState } from 'react';

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState(editingNote?.title || "");
  const [content, setContent] = useState(editingNote?.content || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-heading"><h2>{editingNote ? 'Edit note' : 'New note'}</h2><button type="button" onClick={onCancel} aria-label="Close note form">×</button></div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-input form-textarea"
        required
      />
      <div className="form-actions">
        <button type="submit" className="primary-button">
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        <button type="button" onClick={onCancel} className="secondary-button">Cancel</button>
      </div>
    </form>
  );
}

export default NoteForm;