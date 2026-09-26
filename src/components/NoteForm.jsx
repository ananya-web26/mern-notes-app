function NoteForm({ onSave, onCancel }) {
	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		onSave({
			title: formData.get('title'),
			content: formData.get('content'),
		});
	}

	return (
		<form className="mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-[#302b39]" onSubmit={handleSubmit}>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-display text-lg font-semibold">New note</h2>
				<button className="text-xl text-[#777782]" type="button" onClick={onCancel} aria-label="Close new note form">×</button>
			</div>

			<div className="grid gap-3">
				<input className="rounded-lg border border-[#e2e2e8] bg-white px-3 py-2 text-sm outline-none focus:border-[#eea4aa] dark:border-[#51495c] dark:bg-[#211e28]" name="title" placeholder="Note title" required />
				<textarea className="min-h-24 resize-y rounded-lg border border-[#e2e2e8] bg-white px-3 py-2 text-sm outline-none focus:border-[#eea4aa] dark:border-[#51495c] dark:bg-[#211e28]" name="content" placeholder="Write your note..." required />
			</div>

			<div className="mt-4 flex gap-2">
				<button className="rounded-lg bg-[#eea4aa] px-4 py-2 text-sm font-semibold text-[#3d2528]" type="submit">Save note</button>
				<button className="rounded-lg bg-[#f2f2f5] px-4 py-2 text-sm dark:bg-[#494253] dark:text-[#f8f4f8]" type="button" onClick={onCancel}>Cancel</button>
			</div>
		</form>
	);
}

export default NoteForm;
