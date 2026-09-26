function NoteCard({ note, onDelete }) {
	return (
		<article className={`relative z-20 flex h-[209px] flex-col rounded-xl p-4 text-[#24202a] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_16px_28px_rgba(36,32,42,0.22)] ${note.color}`}>
			<div className="flex items-center justify-between text-[10px] font-semibold text-[#4d4654]">
				<span>{note.date}</span>
				<button className="rounded bg-black/20 px-1.5 py-0.5 text-xs font-bold text-[#20202a]" type="button" aria-label={`Open ${note.title}`}>
					↗
				</button>
			</div>

			<h3 className="mt-2 text-lg font-bold">{note.title}</h3>
			<p className="mt-3 text-xs font-semibold leading-[1.45] text-[#403846]">{note.content}</p>
			<div className="mt-auto flex items-center justify-between text-[10px] font-semibold text-[#4d4654]">
				<span>◷ {note.time}</span>
				<button className="rounded bg-black/20 px-1.5 py-0.5 text-xs font-bold text-[#20202a]" type="button" onClick={() => onDelete(note._id)} aria-label={`Delete ${note.title}`}>
					×
				</button>
			</div>
		</article>
	);
}

export default NoteCard;
