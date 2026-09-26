function Header({ darkMode, onToggleDarkMode }) {
	return (
		<header className="flex flex-wrap items-center gap-4 px-4 py-5 sm:h-[68px] sm:flex-nowrap sm:gap-7 sm:px-[30px] sm:py-0">
			<h1 className="mr-auto font-display text-2xl font-bold tracking-tight sm:text-3xl">NO CAP.</h1>
			<label className="order-3 flex h-11 w-full items-center rounded-lg bg-[#f5f5f8] px-4 text-base text-[#9a9aa3] dark:bg-[#322e3d] dark:text-[#c8c0ce] sm:order-none sm:w-[210px]">
				<span aria-hidden="true">⌕</span>
				<input className="ml-2 w-full border-0 bg-transparent text-sm font-medium outline-none" type="search" placeholder="Search" aria-label="Search notes" />
			</label>
			<p className="text-xs font-semibold">ananya</p>
			<button className="text-base" type="button" onClick={onToggleDarkMode} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
				{darkMode ? '☀' : '☾'}
			</button>
			<button className="text-base" type="button" aria-label="Open menu">☰</button>
		</header>
	);
}

export default Header;
