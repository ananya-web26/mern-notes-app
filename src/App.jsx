import { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteForm from './components/NoteForm';
import AddButton from './components/AddButton';

const colors = ['note-blue', 'note-lilac', 'note-peach', 'note-yellow'];

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    fetch('http://localhost:3000/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }

  function handleAddOrUpdate(noteData) {
    if (editingNote) {
      fetch(`http://localhost:3000/api/notes/${editingNote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      }).then(() => {
        fetchNotes();
        setEditingNote(null);
        setShowForm(false);
      });
    } else {
      fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      }).then(() => {
        fetchNotes();
        setShowForm(false);
      });
    }
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE',
    }).then(() => {
      fetchNotes();
    });
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowForm(true);
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="app-shell">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {showForm && (
        <NoteForm
          key={editingNote?._id || 'new-note'}
          onSubmit={handleAddOrUpdate}
          editingNote={editingNote}
          onCancel={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
        />
      )}

      <section className="notes-grid" aria-label="Your notes">
        {filteredNotes.map((note, index) => (
          <NoteCard
            key={note._id}
            note={note}
            color={colors[index % colors.length]}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </section>

      {filteredNotes.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-icon">✦</span>
          <p>{searchTerm ? 'No notes match your search.' : 'Your notebook is empty.'}</p>
        </div>
      )}

      <AddButton onClick={() => setShowForm(true)} />
      <nav className="bottom-nav" aria-label="Main navigation">
        <button className="nav-item active" type="button" aria-label="Notes"><span>⌂</span></button>
        <button className="nav-item" type="button" aria-label="Calendar"><span>▦</span></button>
        <button className="nav-item" type="button" aria-label="Folders"><span>▰</span></button>
        <button className="nav-item" type="button" aria-label="Profile"><span>◯</span></button>
      </nav>
    </main>
  );
}

export default App;