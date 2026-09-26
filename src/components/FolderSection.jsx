function FolderSection({ folders, onDelete, onNewFolder }) {
	return (
		<section className="relative z-10" aria-labelledby="folders-heading">
			<h2 id="folders-heading" className="mb-5 text-2xl font-bold">Recent Folders</h2>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{folders.map((folder) => (
					<article className={`relative z-20 flex h-[115px] flex-col justify-between rounded-xl p-4 text-left text-[#24202a] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_22px_rgba(36,32,42,0.18)] ${folder.color}`} key={folder._id}>
						<span className={`text-3xl leading-none ${folder.icon}`} aria-hidden="true">◩</span>
						<button className="absolute right-3 top-3 rounded bg-black/15 px-1.5 text-sm font-bold text-[#24202a]" type="button" onClick={() => onDelete(folder._id)} aria-label={`Delete ${folder.name}`}>
							×
						</button>
						<span>
							<strong className="block text-base font-bold text-[#24202a]">{folder.name}</strong>
							<small className="text-[10px] font-semibold text-[#4d4654]">{new Date(folder.createdAt).toLocaleDateString()}</small>
						</span>
					</article>
				))}

				<button className="relative z-20 flex h-[115px] flex-col items-center justify-center rounded-xl border border-dashed border-[#b9bbc4] text-center text-xs text-[#4c4d56] dark:border-[#706a7a] dark:text-[#ddd5e1]" type="button" onClick={onNewFolder}>
					<span className="mb-2 text-xl" aria-hidden="true">+</span>
					New folder
				</button>
			</div>
		</section>
	);
}

export default FolderSection;
