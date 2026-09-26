import NoteCard from './NoteCard';

function NoteSection({ notes, onNewNote, onDelete }) {
	return (
		<section className="relative z-10 mt-[38px]" aria-labelledby="notes-heading">
			<div className="mb-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h2 id="notes-heading" className="text-2xl font-bold">BRAIN DUMP</h2>
				<span className="text-[10px] text-[#85858d]">December 2056
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{notes.map((note, index) => <NoteCard key={note._id || `${note.title}-${note.time}-${index}`} note={note} onDelete={onDelete} />)}
				<button className="relative z-20 flex h-[209px] flex-col items-center justify-center rounded-xl border border-dashed border-[#b9bbc4] text-xs text-[#4c4d56]" type="button" onClick={onNewNote}>
					<span className="mb-2 text-xl" aria-hidden="true">+</span>
					New note
				</button>
			</div>
		</section>
	);
}

export default NoteSection;
