function TrashSection({ notes, folders, onRestoreNote, onRestoreFolder }) {
	return (
		<section className="relative z-10" aria-labelledby="trash-heading">
			<h2 id="trash-heading" className="mb-2 text-2xl font-bold">Trash</h2>
			<p className="mb-6 text-sm opacity-70">Deleted notes and folders can be restored.</p>

			<div className="grid gap-3">
				{folders.map((folder) => (
					<div className="flex items-center justify-between rounded-xl bg-white/80 p-4 text-[#24202a] dark:bg-[#302b39] dark:text-[#f8f4f8]" key={folder._id}>
						<span className="font-semibold">Folder: {folder.name}</span>
						<button className="rounded-lg bg-[#c8a7ed] px-3 py-2 text-sm font-semibold text-[#24202a]" type="button" onClick={() => onRestoreFolder(folder._id)}>Restore</button>
					</div>
				))}

				{notes.map((note) => (
					<div className="flex items-center justify-between rounded-xl bg-white/80 p-4 text-[#24202a] dark:bg-[#302b39] dark:text-[#f8f4f8]" key={note._id}>
						<span className="font-semibold">Note: {note.title}</span>
						<button className="rounded-lg bg-[#c8a7ed] px-3 py-2 text-sm font-semibold text-[#24202a]" type="button" onClick={() => onRestoreNote(note._id)}>Restore</button>
					</div>
				))}

				{notes.length === 0 && folders.length === 0 && <p className="text-sm opacity-70">Trash is empty.</p>}
			</div>
		</section>
	);
}

export default TrashSection;
