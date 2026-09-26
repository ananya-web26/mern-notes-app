function NoteCard({ note, color, onDelete, onEdit }) {
  const date = note.createdAt
    ? new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : 'New note';

  return (
    <article className={`note-card ${color}`}>
      <div className="note-card-topline"><span>Note</span><button onClick={() => onEdit(note)} type="button" aria-label={`Edit ${note.title}`}>•••</button></div>
      <h2>{note.title}</h2>
      <p className="note-preview">{note.content}</p>
      <div className="note-card-footer"><span>{date}</span><button onClick={() => onDelete(note._id)} type="button" aria-label={`Delete ${note.title}`}>×</button></div>
    </article>
  );
}

export default NoteCard;