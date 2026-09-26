function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <label className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input type="search" placeholder="Search your notes!" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} aria-label="Search notes" />
    </label>
  );
}

export default SearchBar;