function FolderForm({ onSave, onCancel }) {
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		onSave({ name: formData.get('name'), color: 'bg-[#c8a7ed]' });
	}

	return (
		<form className="relative z-20 mb-6 rounded-xl bg-white p-5 shadow-sm dark:bg-[#302b39]" onSubmit={handleSubmit}>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-display text-lg font-semibold">New folder</h2>
				<button className="text-xl opacity-70" type="button" onClick={onCancel} aria-label="Close new folder form">×</button>
			</div>
			<input className="w-full rounded-lg border border-[#e2e2e8] bg-white px-3 py-2 text-sm outline-none focus:border-[#c8a7ed] dark:border-[#51495c] dark:bg-[#211e28]" name="name" placeholder="Folder name" required />
			<div className="mt-4 flex gap-2">
				<button className="rounded-lg bg-[#c8a7ed] px-4 py-2 text-sm font-semibold text-[#24202a]" type="submit">Save folder</button>
				<button className="rounded-lg bg-[#f2f2f5] px-4 py-2 text-sm dark:bg-[#494253]" type="button" onClick={onCancel}>Cancel</button>
			</div>
		</form>
	);
}

export default FolderForm;
