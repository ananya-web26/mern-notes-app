function Sidebar({ onHome, onTrash }) {
	return (
		<aside className="w-full shrink-0 bg-white px-5 py-5 dark:bg-[#1d1a24] lg:w-[170px] lg:px-6 lg:py-8">
			<p className="mb-5 text-[13px] font-bold tracking-[3px] lg:mb-11">MINO</p>

			<nav className="flex gap-5 overflow-x-auto lg:grid lg:gap-[18px]" aria-label="Sidebar navigation">
				<button className="text-left text-sm font-bold text-[#20202a] dark:text-[#f8f4f8]" type="button" onClick={onHome}>
					Add new
				</button>
				<button className="text-left text-sm font-semibold text-[#9999a1]" type="button">
					Calendar
				</button>
				<button className="text-left text-sm font-semibold text-[#9999a1]" type="button">
					Archive
				</button>
				<button className="text-left text-sm font-semibold text-[#9999a1]" type="button" onClick={onTrash}>
					Trash
				</button>
			</nav>
		</aside>
	);
}

export default Sidebar;
